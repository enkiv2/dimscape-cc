#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QGraphicsScene>

namespace Ui {
    class MainWindow;
}

class MainWindow : public QMainWindow {
    Q_OBJECT
public:
    MainWindow(QWidget *parent = 0);
    ~MainWindow();

public slots:
    void loadFile();
    void newWorld();
    void newCellTest();
protected:
    void changeEvent(QEvent *e);

private:
    QGraphicsScene* scene;
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
