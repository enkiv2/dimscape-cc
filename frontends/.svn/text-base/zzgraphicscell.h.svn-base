/* zzgraphicscell.h
 * (c) 2010 John Ohno
 * modified 2010 Jonathan Kopetz
 * License under the GNU GPL v.3
 */
#ifndef ZZGRAPHICSCELL_H
#define ZZGRAPHICSCELL_H

#include <QGraphicsRectItem>
#include <QList>

#include <lib/ZZCell.h>


class ZZGraphicsCell : public QGraphicsRectItem
{

public:
    ZZGraphicsCell(qreal thick, ZZCell& moi)
    {
    	me=moi;
	setFlags(ItemIsFocusable);
	update();
    }
    ZZGraphicsCell(QGraphicsItem* aParent = 0) :
            QGraphicsRectItem(aParent), penThick(1)
    {
    	me=ZZCell();
	setFlags(ItemIsFocusable);
	update();
    }
    ZZGraphicsCell(QRectF& aRect, QGraphicsItem* aParent = 0) :
            QGraphicsRectItem(aRect,aParent)
    {
    	me=ZZCell();
	setFlags(ItemIsFocusable);
	update();
    }

    int type ()
    {
    	return UserType+(me).getType();
    }
    
    QRectF boundingRect() const
    {
        QRectF lowBox = childrenBoundingRect();
        return QRectF(lowBox.left() - penThick/2, lowBox.top() - penThick/2, 
			lowBox.width() + penThick, lowBox.height() + penThick);
    }

    int getPenThick() const
    {
        return penThick;
    }
    
    void setPenThick(int aThick)
    {
        penThick = aThick;
    }

private:
    ZZCell me;
    qreal penThick;

};

#endif // ZZGRAPHICSCELL_H
