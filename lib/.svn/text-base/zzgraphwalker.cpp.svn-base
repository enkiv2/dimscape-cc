/* zzgraphwalker.cpp
 * (c) 2010 Jonathan Kopetz
 * Licensed under the GNU GPL v.3
 */
#include <QtGui>
#include "zzgraphwalker.h"

 ZZGraphWalker::ZZGraphWalker(QObject *parent)
     : QThread(parent)
 {
     restart = false;
     abort = false;

     for (int i = 0; i < ColormapSize; ++i)
         colormap[i] = rgbFromWaveLength(380.0 + (i * 400.0 / ColormapSize));
 }

 ZZGraphWalker::~ZZGraphWalker()
 {
     mutex.lock();
     abort = true;
     condition.wakeOne();
     mutex.unlock();

     wait();
 }

 void ZZGraphWalker::walk(cellID root, QString& d1)
{
		mutex.lock();
		QList<QString> dim;
		dim << d1;
		walk(root, dim);
		mutex.unlock();
}
 
void ZZGraphWalker::walk(cellID root, QString& d1
				QString& d2)
{
		mutex.lock();
		QList<QString> dim;
		dim << d1 << d2;
		walk(root, dim);
		mutex.unlock();
}
 
void ZZGraphWalker::walk(cellID root, QString& d1,
				QString& d2, QString& d3)
{
		mutex.lock();
		QList<QString> dim;
		dim << d1 << d2 << d3;
		walk(root, dim);
		mutex.unlock();
}


 void ZZGraphWalker::walk(cellID root, QList<QString>& dims)
 {
	// We may already be in lock due to our convenience methods
	// above
	if (mutex.tryLock())
	{
     QMutexLocker locker(&mutex);
	}
     this->dims = dims;
     this->workCells.clear();
     this->workCells.enqueue(root);

     if (!isRunning()) {
         start(LowPriority);
     } else {
         restart = true;
         condition.wakeOne();
     }
 }

 void ZZGraphWalker::run()
 {
     forever {
         mutex.lock();
	 	QList<QString> dims = this->dims;
	 	QQueue<cellID> workCells = this->workCells;
         mutex.unlock();

             if (allBlack && pass == 0) {
                 pass = 4;
             } else {
                 if (!restart)
                     emit renderedImage(image, scaleFactor);
                 ++pass;
             }
         }

         mutex.lock();
         if (!restart)
             condition.wait(&mutex);
         restart = false;
         mutex.unlock();
     }
 }

}
