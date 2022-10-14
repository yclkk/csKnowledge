##### [788. 逆序对的数量](https://www.acwing.com/problem/content/790/)

> i 右边的数一定是比 j点要大的

![the_first_reversePair](../src/algorithm/the_first_reversePair.png)

----

##### [799. 最长连续不重复子序列](https://www.acwing.com/problem/content/801/)

![third_notRepeat](../src/algorithm/third_notRepeat.png)

> j 是靠左的指针，i是靠右的指针，当 i 往右移动的时候，j 不可能向左移动，因此 i，j 具有单调性，当 (i, j) 之前满足不重复子序列的时候就可以计算最大值了。图中res应该是i - j + 1

----

##### [2816. 判断子序列](https://www.acwing.com/problem/content/2818/)

这一题的核心在于证明：如果存在一个子序列的时候，使用双指针算法的时候也需要成立。

比如：存在一个子序列，那么当使用双指针算法的时候，只会在b数组中原先匹配的位置要靠前找到，因此成立

a：1, 2, 3

b：1, 2, 2, 3, 3

满足的序列可以是b[0], b[2], b[4]，使用双指针的时候可以是b[0], b[1], b[3]。

----

##### [802. 区间和](https://www.acwing.com/problem/content/804/)

这道题的数组范围很大，但是大多数都是为0的，是一种值域很大，但是数却很稀疏的情况

可以先把数离散化，得到的相对坐标，并不影响值。比如要求[1,20]之间的和，但是里面只有下标1，20有值，离散化成连续从1开始的自然数1，2并不影响求和

----

##### [51. 数字排列](https://www.acwing.com/problem/content/47/)

> 这题主要是存在重复元素，不能直接用dfs，要做一些处理

**例子：**比如有一个数12123，先排序11223。注意，1 和 1并不是一样的，是有先后顺序的。如果，第一个 1 放在_ _ _ _ 1，那么第二个 1就没位置放了，它只能在第一个 1 的后面，**也就是要让所有相同的数字相对的位置不变**

```c++
class Solution {
public:
    vector<vector<int>> ans;  // 定义答案
    vector<int> path;  // 将num[u]填充在path的某一个位置
    vector<vector<int>> permutation(vector<int>& nums) {
        path.resize(nums.size()); // 占坑
        sort(nums.begin(), nums.end());  // 将12123排序成11223
        dfs(nums, 0, 0, 0);
        return ans;
    }
    /*
   	 u代表需要将nums[u]填到path的哪个位置
   	 start代表是将nums[u]的起始位置，如果_ _ _ _ 1,那么下一个1只能从(4 + 1)开始找位置
   	 state表示的是path中某个位置是否被用过，用二进制来标志，比如11001,就表示第1 2 5的位置被用过了
    */
    void dfs(vector<int> &nums, int u, int start, int state) {
        if (u == nums.size()) {
            ans.push_back(path);
            return;
        }
        if (!u || nums[u] != nums[u - 1]) start = 0;
        for (int i = start; i < nums.size(); i++) {
            if (!(state >> i & 1)) {
                path[i] = nums[u];
                dfs(nums, u + 1, i + 1, state + (1 << i));
            }
        }
    }
};
```



