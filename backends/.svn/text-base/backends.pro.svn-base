TEMPLATE = subdirs
BACKENDS = $$find(CONFIG, .*-backend)
isEmpty(BACKENDS) {
	error("You must select a backend: sql-backend, ...")
}
sql-backend {
SUBDIRS += sql
}
CONFIG += debug
# PKGCONFIG += yaml-cpp
QMAKE_CXXFLAGS_DEBUG += -Wall
