/* zzgraphwalker.h
 * (c) 2010 Jonathan Kopetz
 * Licensed under the GNU GPL v.3
 */

#ifndef RENDERTHREAD_H
 #define RENDERTHREAD_H

 #include <QMutex>
 #include <QList>
 #include <QQueue>
 #include <QThread>
 #include <QWaitCondition>
 #include <lib/ZZCell.h>
 #include <backends/zzbackend.h>

 class ZZGraphWalker : public QThread
 {
     Q_OBJECT

 public:
     ZZGraphWalker(QObject *parent = 0);
     ~ZZGraphWalker();

     void walk(cellID root, QString& d2);
	 void walk(cellID root, QString& d1, QString& d2);
	 void walk(cellID root, QString& d1, QString& d2,
					 QString& d3);
	 void walk(cellID root, QList<QString>& dims);
 signals:
     void foundNewCell(cellID fromCell, ZZCell::cell_dir conn, 
					 QString& dim, cellID newCell);
	 void foundConn(cellID fromCell,ZZCell::cell_dir conn,
					 QString& dim, cellID toCell);
	 void walkedGraph(ZZGraph* graph);

 protected:
     void run();

 private:
     QMutex mutex;
     QWaitCondition condition;
	 QList<QString> dims;
	 ZZGraph graph;
     bool restart;
     bool abort;
 };

 #endif
