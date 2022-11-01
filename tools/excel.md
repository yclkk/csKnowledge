**驼峰**：=LEFT(C251,1)&MID(SUBSTITUTE(PROPER(C251),"_",""),2,100)

**首字母大写驼峰：**=LEFT(C251,1)&MID(SUBSTITUTE(PROPER(C251),"_",""),2,100)

其中 C251 为列，可以通过下拉填充后续列。

