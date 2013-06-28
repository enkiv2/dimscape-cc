# -------------------------------------------------
# Project created by QtCreator 2010-01-16T15:37:24
# -------------------------------------------------
QT += webkit \
    multimedia 
MAKEFILE = Makefile.qt
TARGET = dimscape
!isEmpty(prefix) {
	unix:target.path = $${prefix}/bin
	win32:target.path = $${prefix}/Dimscape
	INSTALLS += target
}
DESTDIR = ../
TEMPLATE = app
INCLUDEPATH += ../
LIBS += -lzz -L../lib \
	-lbackend -L../backends
SOURCES += main.cpp \
    mainwindow.cpp \
    zzspace.cpp \
    zzgraphicscell.cpp
HEADERS += mainwindow.h \
    zzspace.h \
    zzgraphicscell.h 
FORMS += mainwindow.ui
CONFIG += link_pkgconfig debug
# PKGCONFIG += yaml-cpp
QMAKE_CXXFLAGS_DEBUG += -Wall
