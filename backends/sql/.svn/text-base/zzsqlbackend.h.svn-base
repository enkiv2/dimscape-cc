/* zzsqlbackend.h
 * (c) 2010 Jonathan Kopetz
 * Licensed under the GNU GPL v.3
 */

#ifndef ZZSQLBACKEND_H
#define ZZSQLBACKEND_H

#include <QtSql>
#include <QList>
#include <QDebug>

#include <lib/ZZCell.h>

class ZZSqlBackend : public QObject
{
	Q_OBJECT
	public:
		ZZSqlBackend(QString& db);
		cellID getRootCell();
		void loadConfig();
		bool loadCells(QList<cellID>& list);
		bool loadCell(cellID cell);

	protected:
		void prepareStatements();
		void prepareRuntimeState();
		void openConnection(QString& db);
		bool initDB();
		void setupDB();
		bool isSetup();
		bool gatherIds(QSqlQuery& q, ZZCell& tempCell, cell_dir dir);
		bool fillDB();
		bool batchCreateFirstCells(); 
		bool createFirstCells();
		bool batchConnectFirstCells();
		bool connectFirstCells();


	private:
		QSqlDatabase conn;
		
		/* 
		 * Prepared statements
		 * Grabbing data is going to happen often
		 * so we want that prepared ahead of time.
		 *
		 * Insertions are security risks, so we 
		 * prepare them here as well
		 */
		QSqlQuery insertCell;
		QSqlQuery updateCellType;
		QSqlQuery updateCellContent;
		QSqlQuery insertConnection;
		QSqlQuery updateConnection;
		QSqlQuery gatherCellPos;
		QSqlQuery gatherCellNeg;
		QSqlQuery getCell;


};

#endif // ZZSQLBACKEND_H
