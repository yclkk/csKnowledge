##### 数据库

### 数据库的常用命令

```sql
use test; // 进行test库
show tables;// 展示表
show tables from test2; // 在test库下查看test2库下的表
select database();  // 查看当前库
select version() // 查看当前数据库版本
select user()  # 查看当前用户
desc 表名 // 查看表结构
ifnull(字段名，返回值) // 如果字段名的值为null，则返回指定值
#注释 -- 注释 /*注释*/
show variable like '%char%' # 展示字符集 其中show variable表示的是展示系统变量

```

### 数据库常见一些优化

- 比如一个员工表有部门这个字段，那么就可以将字符型的“人事部”、“研发部” 转为int型的1,2来表示，**减少冗余**

### 数据库语言

**在进行数据库语言操作时，尽量要先进入库**

#### DQL(Data Query Language)

##### 查询语句

```sql
select 查询列表 from 表明
// 查询列表可以是：表中的字段、常量值、表达值、函数
// 如果查询列表是跟关键字相同，可以用 ``着重号表示它是查询列表
```

```sql
/* 字段*/
select `id`, `user_id` from employees;

/*常量值*/
select 100;
select 'zhangsan';

/*表达式*/
select 100 * 100;

/*函数*/
select version(); // 调用该方法，并得到返回值
```

- **起别名**：在连接查询时，取别名有利于区分相同的字段名

```sql
# select 字段名 AS 别名
selct first_name AS 姓, last_name AS 名 from employees;

# select 字段名 空格 别名
select first_name 姓, last_name 名 from employees;

# 别名含有 关键字 或者 特殊符号的情况
select salary as `out put` from employees;
select salary as "out put" or 'out put' from employees;
```

- **去重**

```sql
# select distinct 字段名 from 表名
select distinct department_id from employees;
```

- **mysql中 + 号的作用**：仅仅作为运算符，无法作为连接符
  - select 100 + 90     # 答案为190
  - select ‘110‘ + 90   # 答案为200  将字符型强制转型
  - select 'abc' + 90   # 答案为 90 强制转换失败，字符型转为0
  - select null + 90    # 答案为null，其中一方为null，答案都为null
- concat()实现两个字符串连接

```sql
select concat(first_name,' ', last_name) from employees; # 使用''可以连接指定字符，比如'a'
```

##### 条件查询

```sql
select
	查询列表
from 
	表名
where 
	筛选条件
```

- **简单条件运算符**：>, <,  = , !=,  <>,  >=,  <=
- **逻辑运算符**：&& , ||,  ！,  and, or, not  前三个和后三个对应

```sql 
select last_name from employees where salary>=10000 and salary<=20000; // 其实就是salary>=10000 && salary<=20000
select * from employees where not(salary<=10000 and salary>=20000)  // 其实就是！(s<=10000 && s>=20000)

# 选择工资不在8000到17000的员工姓名和工资，按工资排序
# 这里有个要注意的点：
#    不可以直接写salary<7000 and salary>17000 是查询不出来的，只能用not()， 或者用not between
SELECT last_name, salary FROM employees WHERE not(salary>=8000 and salary<=17000) ORDER BY salary DESC**模糊查询**“：like,  between and , in,  is null, is not null
```

- **like**

```sql
select * from employees where last_name like '%a%'; # 员工名中包含字符a的员工信息
# 其中%代表通配符，替代0个或多个字符，比如
select * from employees where last_name like 'a%'; # 员工名中以字符a开头的员工信息

# _通配符，表示替代任意一个字符
select * from employees where last_name like '__e_a%'; -- 员工名中第三个字符为e，第五个字符为a的员工信息

# 使用\转义 \_表示字符_
select * from employees where last_name like '_\_%'; -- 员工名中第二个字符为_的员工信息
# 可以使用别的符号作为转义符，比如
select * from employees where last_name like '_$_%' escape '$'; # 使用escape来表示$为转义符

```



- **between and**：在...之间

```sql
# 等价于 <= and >=, 因此between and顺序不能颠倒
select * from employees where employee_id between 100 and 200 # 查询员工编号100到200之间的员工编号。是闭区间
```

- **in**

```sql
# 查看员工工种编号为a, b, c中的一个员工名和员工编号
select last_name, job_id from employees where job_id = 'a' or job_id = 'b' or job_id = 'c';
select last_name, job_id from employees where job_id in('a', 'b', 'c');
```

- **is null**：=不能用于判断空值，因此如果用=null查询不出来数据

```sql
# 查询没有奖金率的员工名和奖金率
select last_name, commission_pct from employees where commisson_pct is null;
```

- **is not null**：<>也就是!= 不能用于判断不为空值 	
- **<=>**：安全等于，既可以判断数值，也可以判断null

```sql
select last_name, salary from employees where salary <=> 12000; # 查询salary等于12000的数据

select last_name, commission_pct from employees where commission_pct <=> null # 判断commission_pct为null的数据
```

-----

#####  排序查询

```sql
select 查询列表 from 表 where 查询条件 order by 排序列表 [asc | desc] # asc：升序，desc：倒序

select * from employees order by salary desc # 查询员工信息，要求工资从高到低排序
```

例子

```sql
# 按年薪的高低显示员工的信息和年薪（按别名排序）
select *, salary*12*(1+ifnull(commission_pct, 0)) as 年薪 from employees order by 年薪 desc

# 按姓名长度显示员工的姓名和工资（按函数排序）
SELECT LENGTH(last_name) as 姓名长度, last_name, salary FROM employees ORDER BY 姓名长度 desc

# 查询员工信息，要求先按工资升序，再按员工编号降序（按多个字段排序）
SELECT * FROM employees ORDER BY salary asc, employee_id DESC   # 工资有相同的情况
```



#### DML(Data Manipulate Language)

#### DDL(Data Definite Language)

-------

#### 常见函数

基本格式：`select 函数名(实参列表) 【from 表】` 其中如果实参列表有就from表

**分类**

##### 单行函数

`concat`, `length`, `ifnull`, `lower upper`, `substr`, `substring`, `instr`, `trim` 等

```sql
1. # 获取字节数
select length('str') 

2. # 拼接两个字符串
select concat(last_name, '_', first_name) from employees;  

3. 
select upper('str') # 输出STR
select lowwer('Str') # 输出str

4. # substr 与 substring意思一样
# 截取从3开始字符，下标从1开始  
select substr('abcdefghijk', 3)  
# 截取从3开始，指定长度为4
select substr('abcdefghijk', 3, 4)

5. # str2在str1中起始索引的位置，找不到返回0
select instr('abcdasdadas', 'asd') # 输出5

6. # trim 去掉前后空格
select trim('     abc     ') # 输出 abc
# trim 也可以去掉前后指定的字符
select trim('a' from 'aaaaaaaaaaaaaaa打算aaaaaa萨达aaaaaaaaa')

7. # lpad 用指定的字符实现左填充指定长度
select lpad('我是谁', 10, 'a') # 输出aaaaaaa我是谁
select lpad('我是谁', 2, 'a') # 输出我是

# rpad 右填充

8. # replace 
select replace('你是我的神', '神', '爱人') # 输出 你是我的爱人
```

----

###### 数学函数

```sql 
1. # round 四舍五入
select round(-1.55) # 输出-2
select round(-1.556, 2) #输出 -1.57 第二个参数表示小数点保留2位

2. # ceil 向上取整 返回>=参数的最小整数
select ceil(-1.4) # 输出-1
	 # floor 向下取整，返回<=参数的最大整数
select floor(-1.4) # 输出-2

3. # truncate(n, x) 小数点后保留x位
select truncate(1.1234, 1) # 输出1.1

4. # mod 取模  mod(a, b) = a - a / b * b 其中 a/b是向下取整
select mod(10, 3) # 输出 1
select mod(10, -3) # 输出1

```

----

###### 日期函数

```sql
1. # now 返回当前系统的日期和时间
select now()

# curdate 返回当前系统的日期
select curdate()

# curtime 返回当前系统的时间
select curtime()

2. # 可以获取指定的年、月、日、小时、分钟、秒
# year 获取年
select year(now()) # 输出2022
select year('1999-09-10') # 输出1999
select year(hirdate) from employees

# month获取月
select month(now())) #输出7月
select monthname(now()) # 

3。 # datediff 统计两日期相差的天数
select datediff(date_1, date_2)
select datediff(now(), '1999-9-10') # 出生天数

```

| 序号 | 格式符 | 功能                  |
| :--- | ------ | --------------------- |
| 1    | %Y     | 4位的年份             |
| 2    | %y     | 2位的的年份           |
| 3    | %m     | 月份（01, 02, 03...） |
| 4    | %c     | 月份（1, 2, 3, 4...)  |
| 5    | %d     | 日（01，02...）       |
| 6    | %H     | 小时（24小时制）      |
| 7    | %h     | 小时（12小时制）      |
| 8    | %i     | 分钟（00, 01, 02...） |
| 9    | %s     | 秒（00, 01, 02...）   |

```sql
3. # str_to_date 将字符通过指定的格式转化成日期
SELECT STR_TO_DATE('2010-9-10','%Y-%c-%d') # 输出2010-09-10
# 其实目的是为了转换字符串， 因为用户在穿参的时候不一定是按照正常的格式来的，同时也传的是一个字符串
select str_to_date('9-10-2010', '%c-%d-%Y') # 也可以输出2010-09-10
select str_to_date('9-10 2010', '%c-%d %y') # 同样输出2010-09-10

4. # date_format 将日期转换成字符
SELECT DATE_FORMAT(NOW(),'%y年%m月%d日') # 输出22年07月23日
# 查询有奖金的员工名和日职日期（xx月/xx日 xx年）
select last_name, date_format(hiredate, '%m月/%d日 %y年') from employees 
where commission_pct is not null
```

-----

###### 流程控制函数

```sql
1. # if函数：if else的效果
select if(10<5, 'true', 'false')
select last_name, commission_pct, if(commission_pct is null, '没奖金', '有奖金') from employees

2. # case：switch case的效果
/*
case 要判断的字段或者表达式
when 常量1 then 要显示的值1或者 语句1;    语句才用加分号
when 常量2 then 要显示的值2或者 语句2;
...
else 要显示的值n或者 语句n;
end

这里要做个申明，因为then后面加的可以是值或者语句，因此case函数可以充当语句比如select，也可以充当语句

案例：查询员工表的工资，要求
部门号=30，显示的工资为1.1倍
部门号=40，显示的工资为1.2倍
其他部门，显示的工资为原工资
*/ 
select salary 原工资, department_id,
case department_id
when 30 then salary*1.1
when 30 then salary*1.2
else salary
end as 新工资
from employees

/* case的使用二
case：多重if的效果

case
when 条件1 then 要显示的值1或者 语句1;
when 条件2 then 要显示的值2或者 语句2;
... 
else 要显示的值n或者语句n
end

案例：查询员工的工资的情况
如果工资>20000 显示A级别
如果工资>15000 显示B级别
如果工资>10000 显示C级别
否则 显示D级别
*/
SELECT salary,
case 
when salary > 20000 then 'A'
when salary > 15000 then 'B'
when salary > 10000 then 'C'
else 'D'
end as grade
FROM employees;

```

----

##### 分组函数

> 功能：用作统计使用，又称为聚合函数或统计函数或组函数

```sql
1. # sum：求和, avg：求平均值, max：最大值, min：最小值, count：计算个数；以上函数都会略null值
select sum(salary) from employees; 
select avg(salary) from employees; # sum 和 avg 会忽略null值，可以用null+1==null或者用commission_pct 来验证
select max(salary)...
select min(salary)... # max 和 min 忽略null值
select count(salary)... # 统计非null值个数

# 可以跟其他函数复合使用
select round(max(salary), 2)... # 保留两位小数

# 参数支持的类型
select sum(last_name), AVG(last_name) from employees # 参数为字符，输出异常，不支持
select sum(hirdate), AVG(hiredate) from employees # 参数为日期，输出异常，不支持

select max(last_name), min(last_name) ... # 正常比较，支持
select max(hiredate), min(hiredate) ... # 正常比较，支持

2. # 可以和distinct去重搭配
select sum(distinct salary), sum(salary) from employees; # 输出397900，691400
select count(distinct salary), count(salary) from employees; # 输出57， 107
 
3. # count可以用来统计行数
select count(*) from employees. # 输出107。只要某一行有一个值不为null，那么都+1
select count(1) from employees # 输出107。添加字段1，本质跟count(*)差不多
  /*
  	效率对比
  	MYSAM：count(*) 效率高
  	INNODB：count(*) 和 count(1) 差不多
  */
 4. # 和分组函数一同查询的字段要求是group by后的字段
 select avg(salary), employee_id from employees; # 错误，输出的表格有误，就是因为employee_id有很多行


5. # group by 大体意思上就是将相同名字的列分成一组
/*
语法：
	select 分组函数, 列（要求出现在group by后面）
	from 表
	[where 筛选条件]
	group by 分组列表
	[order by 字句]
注意：
	查询列表必须特殊，要求是分醉函数和group by后出现的字段
*/

# 查询每个工种的最高工资
SELECT max(salary), job_id FROM employees GROUP BY job_id 

5.1 简单分组# 查询邮箱中包含a字符的，每个部门的平均工资
SELECT avg(salary) as 平均工资, department_id
FROM employees
where email like '%a%' 
GROUP BY department_id

# 查询有奖金的的每个领导手下员工的最高工资
SELECT max(salary) as 最高工资, manager_id
FROM employees
where commission_pct is not NULL
GROUP BY manager_id

5.2 复杂分组 # 查询哪个部门的员工个数>2
# 错误演示
select count(*), department_id
from employees
where count(*)   # 这里出错，因为count(*)不属于employees表里的，是属于是一个新的字段
group by department_id
# 正确演示
select count(*), department_id
from employees 
group by department_id
having count(*)   # 使用having关键字

# 查询每个工种有奖金的员工的最高工资>12000的工种编号和最高工资
SELECT max(salary), job_id
FROM employees
where commission_pct is not NULL
GROUP BY job_id
having max(salary)>12000

  # 查询领导编号>102的每个领导手下的最低工资>5000的领导编号是哪个，以及其最低工资
SELECT MIN(salary), manager_id
FROM employees
WHERE manager_id>102
GROUP BY manager_id
having MIN(salary)>5000

5.3 # 按多个字段分组
# 查询每个部门每个工种的员工的平均工资
select avg(salary) department_id, job_id
from employees
group by department_id, job_id
```

```sql
6. # 连接查询：又称多表查询，当查询的字段来自于多个表时，就会使用到
# 错误样例
select name, boyName from beauty, boys; # 会发现beauty中每一条数据都会去跟boys表的全部数据去匹配
/*
	这就是笛卡尔集的错误情况
	select count(*) from beauty  假设输出12
	select count(*) from boys		 假设输出4
	最终结果就是12*4=48行
	原因就是在于没有添加有效的连接条件 
*/
# 正确样例
SELECT name, boyName 
FROM beauty, boys
where beauty.boyfriend_id = boys.id  # 使用表明去界定

```





### 三范式

> 范式的意思：符合某一级别的关系模式的集合，表示一个内部各属性之间的联系和合理化程度。大致意思就是***一张数据表的表结构符合某种设计规范的级别***
>
> 关系和关系模式的区别：关系是关系模式的一个实例，关系就是数据表，关系模式就是数据表的表结构

- 第一范式（1NF）：符合1NF关系中的每个属性都不可再分；1NF是所以关系型数据库的最低要求

  - 数据冗余
  - 插入异常
  - 修改异常
  - 删除异常

- 第二范式（2NF）：2NF是在1NF的基础上，消除了非主属性对于码的部分函数依赖

  > 码：设K为某表的一个属性或者属性组，除了K之外的所有属性都***完全依赖***于K，则K为表的候选码，简称码。也可以说是确定了K就是确定了K之外的所有属性
  >
  > 函数依赖：类似于y = f(x)，y依赖于x，写成x→y。在一张表中，在属性（或属性组）X的值确定的情况下，必定能确定Y的值，那么就可以说X→Y
  >
  > 完全函数依赖：在一张表中，若X→Y，且对于X的任何一个真子集X'，都不存在X'→Y，记作X  F→Y
  >
  > 部分函数依赖：若X→Y，但同时Y又不完全依赖于X，记作X   P→Y
  >
  > 传递函数依赖：Y→Z，X→Y，前提是X不包含Y、X不函数依赖于Y，那么X→Z，Z传递依赖于X，记作X   T→Z
  >
  > 非主属性：主属性之外的属性

  - 如果存在非主属性部分函数依赖于码，那么就不符合2NF
  - 减少数据冗余
  - 修改正常
  - 删除异常
  - 插入异常

- 第三范式（3NF）：3NF是在2NF的基础上，消除了非主属性对于码的函数传递依赖

  - 第三范式基本解决了数据冗余过大，插入异常，修改异常，删除异常的问题
  - 在实际中，往往为了性能上或者应对的扩展的需要，经常用上2NF和1NF。









这是一行字

这是第二行字

这是全选，是无法删除一行的

如何快速删除一行字

如何快速删除一个词




