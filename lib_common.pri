!isEmpty(prefix) {
	unix:target.path = $${prefix}/lib
	win32:target.path = $${prefix}/Dimscape
	INSTALLS += target
}
