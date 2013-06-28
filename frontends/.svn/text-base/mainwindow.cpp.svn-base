#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QGraphicsSimpleTextItem>
#include <QGraphicsRectItem>
#include <QGraphicsTextItem>
#include <QFileDialog>
#include "zzgraphicscell.h"
#include <QDebug>
int cursorID;

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    scene = new QGraphicsScene(this);
    scene->setSceneRect(QRectF(0, 0, 1024, 768));
    ui->zzViewWidget->fitInView(scene->sceneRect());
    ui->zzViewWidget->setScene(scene);
}

MainWindow::~MainWindow()
{
    delete ui;
    delete scene;
}

void MainWindow::newWorld()
{
	qDebug() << QString("Hello new world!") << endl;
	world.insert(1, *(new ZZCell()));
	world[1].setID(1);
	world[1].setContent(*(new QString("Press i to edit me!")));
	ZZGraphicsCell* foo=new ZZGraphicsCell(qreal(5), (world[1]));
	scene->addItem(foo);
	foo->setZValue(2);
	scene->update();
        foo->update();
	ui->zzViewWidget->show();
	cursorID=1;
	//foo->paint(scene, 200, 200);
	//paintLoop(foo);
}

void MainWindow::newCellTest()
{
	QString rts("root"), rrts("right of root and quite long at that"), 
		lrts("left of root");
	ZZCell rt((cellID)1, 0, rts),
	       rrt((cellID)2, 0, rrts),
	       lrt((cellID)3, 0, lrts);
	
	// QHash should make a copy for us
	// since these guys will be dead soon
	
	world.insert(1, rt);
	world.insert(2, rrt);
	world.insert(3, lrt);

	// Construct our top-level squares
	
	QGraphicsRectItem *rt_rect = new QGraphicsRectItem(0,0,100,20), 
			  *rrt_rect = new QGraphicsRectItem(0,0,100,20), 
			  *lrt_rect = new QGraphicsRectItem(0,0,100,20);

	QGraphicsTextItem *rt_text = new QGraphicsTextItem(rt.getContent(), rt_rect),
			  *rrt_text = new QGraphicsTextItem(rrt.getContent(), rrt_rect),
			  *lrt_text = new QGraphicsTextItem(lrt.getContent(), lrt_rect);


	rt_rect->setPos(420, 420);
	rrt_rect->setPos(530, 420);
	lrt_rect->setPos(310, 420);

	// Add our toplevel squares to our scene

	scene->addItem(rt_rect);
	scene->addItem(rrt_rect);
	scene->addItem(lrt_rect);
	
	scene->update();
	ui->zzViewWidget->show();
}
	

void MainWindow::loadFile()
{
	newCellTest();
    // TODO: take this out entirely
/*
    QString fileName = QFileDialog::getOpenFileName(this,tr("Load ZigZag datafile"),
                                                    QDir::currentPath(), tr("ZigZag files (*.zz);;Any (*)"));
    if (!fileName.isEmpty())
    {
        QGraphicsSimpleTextItem* txt;
        scene->addRect(0, 0, 250, 200, QPen(QColor::fromRgb(255,255,255)), QBrush(QColor(0,100,100), Qt::SolidPattern));
        scene->addRect(0, 260, 250, 200, QPen(QColor::fromRgb(255,255,255)), QBrush(QColor(0,100,100), Qt::SolidPattern));
        txt = scene->addSimpleText(fileName);
        txt->setPos(0, 520);
    }*/
}

void MainWindow::changeEvent(QEvent *e)
{
    QMainWindow::changeEvent(e);
    switch (e->type()) {
    case QEvent::LanguageChange:
        ui->retranslateUi(this);
        break;
    default:
    	break;
    }
}
