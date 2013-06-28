all:  src

clean:
	rm -f *.o Makefile.qt */Makefile.qt qtzz dimscape */*.so */*.a */*.so.*

src:  qtsrc

cellsrc: 
	gcc -Wall  -c -I. -o Cell.o Cell.cpp

dist:
	tar -cz ../dimscape > ../dimscape-`date +%F`.tgz

commit: 
	svn update
	svn commit

update:
	svn update

qtsrc: Makefile.qt
	make -f Makefile.qt

qtclean: Makefile.qt
	make -f Makefile.qt clean
	make -f lib/Makefile.qt clean
	make -f backends/Makefile.qt clean
	make -f frontends/Makefile.qt clean

Makefile.qt: FORCE
	qmake qtzz.pro CONFIG+=sql-backend

FORCE:


