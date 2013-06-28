
include(../../lib_common.pri)

QT -= gui
QT += sql
CONFIG += qt dll
MAKEFILE = Makefile.qt
TEMPLATE = lib
INCLUDEPATH += ../../
TARGET += zzbackend-sql
SOURCES += zzsqlbackend.cpp
HEADERS += zzsqlbackend.h
CONFIG += debug
# PKGCONFIG += yaml-cpp
QMAKE_CXXFLAGS_DEBUG += -Wall

