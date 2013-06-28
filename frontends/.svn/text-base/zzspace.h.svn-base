/* zzspace.h
 * (c) 2010 Jonathan Kopetz
 * Licensed under the GNU GPL v.3
 */
#ifndef ZZSPACE_H
#define ZZSPACE_H

#include <QObject>
#include <QGraphicsView>
#include <QHash>
#include <lib/ZZCell.h>
#include "zzgraphicscell.h"

class ZZSpace : public QObject
{
Q_OBJECT
public:
    explicit ZZSpace(QObject *parent = 0);
    explicit ZZSpace(QGraphicsView* view);
    void move(QString& id);
    void createCell(QString& id);


signals:

public slots:

private:
    QGraphicsView* view;
    QHash<QString, ZZCell*> cells;
    QHash<QString, ZZGraphicsCell*> drawnCells;
    QString currentCellId;
    QString dim1, dim2, dim3;

};

#endif // ZZSPACE_H
