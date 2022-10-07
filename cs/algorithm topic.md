##### [788. 逆序对的数量](https://www.acwing.com/problem/content/790/)

> i 右边的数一定是比 j点要大的

![the_first_reversePair](../src/algorithm/the_first_reversePair.png)

----

##### [799. 最长连续不重复子序列](https://www.acwing.com/problem/content/801/)

![third_notRepeat](../src/algorithm/third_notRepeat.png)

> j 是靠左的指针，i是靠右的指针，当 i 往右移动的时候，j 不可能向左移动，因此 i，j 具有单调性，当 (i, j) 之前满足不重复子序列的时候就可以计算最大值了。图中res应该是i - j + 1
