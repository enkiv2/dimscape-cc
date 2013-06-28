/* zzsqlbackend.cpp
 * (c) 2010 Jonathan Kopetz
 * Licensed under the GNU GPL v.3
 */
#include <QFile>

#include "zzsqlbackend.h"

ZZSqlBackend::ZZSqlBackend(QString& db)
{
	openConnection(db);
	setupDB();
	prepareRuntimeState();
	prepareStatements();
}

cellID ZZSqlBackend::getRootCell()
{
	QSqlQuery q;
	// Bad constants for now,
	// some nice queries later
	// 1 == "Root cellID" cell
	// 2 == cellId value cell
	// from the below diagram
	if (!world.contains(1))
	{
		loadConfig();
	}
	return (world.contains(2) ? (((ZZCell)(world.value(2))).getContent()).toLongLong() : -1);
}

void ZZSqlBackend::loadConfig()
{
	QList<cellID> cids;
	QSqlQuery q;
	/* Again, bad constant, better way should be
	// found, since the user may wish to attach
	// comments to config-names or config-values
	// and we don't want our sweep here to wind up
	// grabbing the whole database or some such
	// This mode breaks at least:
	// -> .qtzz.config-values 
	// V .qtzz.config-name
	// "Background color RGB" -- 0 -- 255 -- 240
	// 
	// TODO: A new approach. Load only those cells
	// connected posward on .qtzz.config-name,
	// then posward-walk on .qtzz.config-values for
	// each of them.
	*/
	q.exec("select id, pos from Connection c where \
			c.dname = \".qtzz.config-values\" and \
			c.id = (select id from Connection ci where \
				ci.dname = \".qtzz.config-name\" or \
				ci.id = 1)");
	while (q.next())
	{
		cids << q.value(0).toLongLong()
			<< q.value(1).toLongLong();
	}
	loadCells(cids);
}

void ZZSqlBackend::openConnection(QString& db)
{
	conn = QSqlDatabase::addDatabase("QSQLITE");
	conn.setDatabaseName(db);
	// If we fail here, error will tell us
	if (!conn.open())
	{
		qDebug() << "Could not open the database: " << db
			<< "\n" << conn.lastError().text() << "\n";
	}
}


void ZZSqlBackend::setupDB()
{
	QSqlQuery q;
	if (!conn.lastError().isValid())
	{
		if (!isSetup())
		{
			initDB();
		}
		// if we can work with the db, select succeeds,
		// and there happens to be nothing in Cell, 
		// indicating we have yet to fill it
		if (q.exec("select 1 from Cell") && !q.next())
		{
			fillDB();
		}
	}
}

bool ZZSqlBackend::isSetup()
{
	QStringList tables = conn.tables();
	if (tables.contains("cell", Qt::CaseInsensitive) && 
	    tables.contains("connection", Qt::CaseInsensitive))
	{
		return true;
	}
	return false;
}

bool ZZSqlBackend::initDB()
{
	QSqlQuery q;
	conn.transaction();
	q.exec("CREATE TABLE Cell (id INTEGER PRIMARY KEY AUTOINCREMENT, \
		type VARCHAR(100), \
		content BLOB)");
	if (q.lastError().isValid())
	{
		qDebug() << "Could not create Cell table in database." 
			<< "\n" << q.lastError().text() << "\n";
		conn.rollback();
		return false;
	}
	q.exec("CREATE TABLE Connection (dname TEXT, \
		id INTEGER, \
		pos INTEGER, \
		PRIMARY KEY(dname, id), \
		FOREIGN KEY(id) REFERENCES Cell \
			ON DELETE RESTRICT \
			ON UPDATE CASCADE, \
		FOREIGN KEY(pos) REFERENCES Cell(id) \
			ON DELETE RESTRICT \
			ON UPDATE CASCADE)");
	if (q.lastError().isValid())
	{
		qDebug() << "Could not create Connections table in database."
			<< "\n" << q.lastError().text() << "\n";
		conn.rollback();
		return false;
	}	
	conn.commit();
	return true;
}

bool ZZSqlBackend::fillDB()
{
	if (conn.driver()->hasFeature(QSqlDriver::BatchOperations))
	{
		return batchCreateFirstCells();
	} 
	return createFirstCells();
}

// Thank god for templates, without which this code was an
// absolute mess
//
// Base connection layout
// Cell ids are in parens
// ---> .qtzz.config-values
// |
// |
// v .qtzz.config-name
//
// (1) "Root cellID"         -- (2) 9
// (3) "Active cell color"   -- (4) "tan"
// (5) "Inactive cell color" -- (6) "gray"
// (7) "View color"          -- (8) "blue"
//
// ---> .x
// |
// |
// v .y
//
// (9) "root" -- (10) "Pos to root on .x"
//
template <class T>
static void getFirstCellValues(T& qvType, T& qvContent)
{
	qvType << "text/plain" << "text/plain"
		<< "text/plain" << "text/plain"
		<< "text/plain" << "text/plain"
		<< "text/plain" << "text/plain";
	
	qvContent << "Root cellID" << "9"
		<< "Active cell color" << "tan"
		<< "Inactive cell color" << "gray"
		<< "View color" << "blue"
		<< "root" << "Pos to root on .x";

}

template <class T, class U>
static void getFirstCellConnections(T& qvdim, U& qvid, U& qvpos)
{
	for (int i = 1; i <= 5; i+=2)
	{
		qvdim << ".qtzz.config-name";
		qvid << i;
		qvpos << (i+2);
	}
	for (int i = 1; i <= 7; i+=2)
	{
		qvdim << ".qtzz.config-values";
		qvid << i;
		qvpos << (i+1);

	}
	qvdim << ".x";
	qvid << Q_INT64_C(9);
	qvpos << Q_INT64_C(10);

}


bool ZZSqlBackend::batchCreateFirstCells()
{
		QVariantList qvType, qvContent;
		conn.transaction();
	
		getFirstCellValues(qvType, qvContent);

		insertCell.addBindValue(qvType);
		insertCell.addBindValue(qvContent);

		if (!insertCell.execBatch())
		{
			qDebug() << "Could not load the base configuration into the database."
				<< insertCell.lastError().text() << "\n";
			conn.rollback();
			return false;
		}
		if (!connectFirstCells())
		{
			// We have already rolled back
			return false;
		}
		conn.commit();
		insertCell.finish();
		return true;
}

bool ZZSqlBackend::createFirstCells()
{
		QStringList qsType, qsContent;
		conn.transaction();
	
		getFirstCellValues(qsType, qsContent);

		QList<QString>::const_iterator it = qsType.constBegin(), 
			it2 = qsContent.constBegin();
		for ( ; it != qsType.constEnd() && it2 != qsContent.constEnd(); it++, it2++)
		{
			insertCell.addBindValue((*it));
			insertCell.addBindValue((*it2));
			if (!insertCell.exec())
			{
				qDebug() << "Could not load the base configuration into the database."
					<< insertCell.lastError().text() << "\n";
				conn.rollback();
				return false;
			} 
		}
		if (!connectFirstCells())
		{
			// We have already rolled back
			return false;
		}
		conn.commit();
		insertCell.finish();
		return true;
}

// Already in transaction
bool ZZSqlBackend::connectFirstCells()
{
	if (conn.driver()->hasFeature(QSqlDriver::BatchOperations))
	{
		if (!batchConnectFirstCells())
		{
			conn.rollback();
			return false;
		}
		return true;
	} 

	QStringList qvdim;
	QList<cellID> qvid, qvpos;
	
	getFirstCellConnections(qvdim, qvid, qvpos);

	QList<QString>::const_iterator dim = qvdim.constBegin();
	QList<cellID>::const_iterator id = qvid.constBegin(), 
		pos = qvpos.constBegin();
	for (; dim != (qvdim.constEnd()) &&
		id != (qvid.constEnd()) &&
		pos != (qvpos.constEnd()); dim++, id++, pos++)
	{
		insertConnection.addBindValue(*dim);
		insertConnection.addBindValue(*id);
		insertConnection.addBindValue(*pos);
		if (!insertConnection.exec())
		{
			qDebug() << "Could not insert a first cell connection:\n"
				<< "dim: " << (*dim)
				<< "id: " << (*id)
				<< "pos: " << (*pos) << "\n"
				<< insertConnection.lastError().text() << "\n";
			conn.rollback();
			return false;
		}
	}

	return true;
}

bool ZZSqlBackend::batchConnectFirstCells()
{
	QVariantList qvdim, qvid, qvpos;
	
	getFirstCellConnections(qvdim, qvid, qvpos);

	insertConnection.addBindValue(qvdim);
	insertConnection.addBindValue(qvid);
	insertConnection.addBindValue(qvpos);

	if (!insertConnection.execBatch())
	{
		qDebug() << "Could not insert the connections between the first cells.\n"
			<< insertConnection.lastError().text() << "\n";
		return false;
	}
	return true;
}

void ZZSqlBackend::prepareRuntimeState()
{
	QSqlQuery q;
	if (!q.exec("PRAGMA foreign_keys = ON"))
	{
		qDebug() << "Could not turn on foreign keys" 
			<< "\n" << q.lastError().text() << "\n";
	}
}

void ZZSqlBackend::prepareStatements()
{
	bool ret = true;
	ret = insertCell.prepare("insert into Cell(id, type, content) \
			values (NULL, ?, ?)");
	if (!ret)
	{
		qDebug() << "Could not prepare the cell insertion query\n"
			<< insertCell.lastError().text() << "\n";
	}
	ret = updateCellType.prepare("update Cell set type = ? where id = ?");
	if (!ret)
	{
		qDebug() << "Could not prepare the cell insertion query\n"
			<< insertCell.lastError().text() << "\n";
	}
	ret = updateCellContent.prepare("update Cell set content = ? where id = ?");
	if (!ret)
	{
		qDebug() << "Could not prepare the cell insertion query\n"
			<< insertCell.lastError().text() << "\n";
	}
	ret = insertConnection.prepare("insert into Connection(dname, id, pos) \
			values (?, ?, ?)");
	if (!ret)
	{
		qDebug() << "Could not prepare the connection insert query\n"
			<< insertCell.lastError().text() << "\n";
	}
	ret = updateConnection.prepare("update Connection set pos = ? \
			where dname = ?, id = ?");
	if (!ret)
	{
		qDebug() << "Could not prepare the connection update query\n"
			<< insertCell.lastError().text() << "\n";
	}
	ret = gatherCellPos.prepare("select pos, dname from Connection \
			where id = ?");
	if (!ret)
	{
		qDebug() << "Could not prepare the posward cell search query\n"
			<< insertCell.lastError().text() << "\n";
	}
	ret = gatherCellNeg.prepare("select id, dname from Connection \
			where pos = ?");
	if (!ret)
	{
		qDebug() << "Could not prepare the negward cell search query\n"
			<< insertCell.lastError().text() << "\n";
	}
	ret = getCell.prepare("select id, type, content from Cell where id = ?");
	if (!ret)
	{
		qDebug() << "Could not prepare the cell getting query\n"
			<< insertCell.lastError().text() << "\n";
	}
}

bool ZZSqlBackend::loadCells(QList<cellID>& cids)
{
	for (QList<cellID>::const_iterator it = cids.constBegin(); 
			it == cids.constEnd(); it++)
	{
		if (!loadCell(*it))
		{
			return false;
		}
	}
	return true;
}

bool ZZSqlBackend::loadCell(cellID cid)
{
	if (world.contains(cid) && 
		((ZZCell)world.value(cid)).getType() != -1)
	{
		return true;
	}
	getCell.addBindValue(cid);
	if (!getCell.exec())
	{
		qDebug() << "Could not load cell: " << cid << "\n"
			<< getCell.lastError().text() << "\n";
		return false;
	}
	getCell.next(); // queue up our cell
	
	QString foo=getCell.value(2).toString();
	ZZCell tempCell((qint64)cid, getCell.value(1).toInt(),
			foo);
	
	getCell.finish();

	bool ret;

	ret = gatherIds(gatherCellPos, tempCell, POSWARD);
	if (!ret) 
		return ret;
	ret = gatherIds(gatherCellNeg, tempCell, NEGWARD);
	if (!ret) 
		return ret;

	world.insert(cid, tempCell);

	return true;
}

bool ZZSqlBackend::gatherIds(QSqlQuery& q, ZZCell& tempCell, cell_dir dir)
{
	q.addBindValue(tempCell.getID());
	if (!q.exec())
	{
		qDebug() << "Could not load connections from cell: " << tempCell.getID() << "\n"
			<< q.lastError().text() << "\n";
		return false;
	}
	while (q.next())
	{
		QString foo=q.value(1).toString();
		switch (dir)
		{
			case NEGWARD:
			tempCell.setNeg((qint64)(q.value(0).toLongLong()),
				foo);
			break;
			case POSWARD:
			tempCell.setPos((qint64)(q.value(0).toLongLong()),
				foo);
			break;
			default:
			break;
		}

	}
	q.finish();
	return true;
}
	
