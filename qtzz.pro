# -------------------------------------------------
# Project created by QtCreator 2010-01-16T15:37:24
# -------------------------------------------------
CONFIG += ordered
TEMPLATE = subdirs
SUBDIRS += lib \
	backends \
	frontends 
CONFIG += link_pkgconfig debug
MAKEFILE = Makefile.qt
# PKGCONFIG += yaml-cpp
QMAKE_CXXFLAGS_DEBUG += -Wall

sql-backend:DEFINES += SQL_BACKEND
