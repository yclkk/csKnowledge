1. lodingCache： [LodingCache](https://cloud.tencent.com/developer/article/1965880，内存变量，可以设置刷新的时间

2. BBIPPublicService： 封装了一些方法

3. 定义了一些参数的时候，要去common.ParamKey.java去声明这个变量，然后再通过Param.Key去引用该变量

4. **config.stream.pfe**下定义了一些分，总、税务局的请求报文和返回报文类型

5. **entity.vo**定义请求参数，一般是将`context -> map -> vo类`。请求参数的字段名称和函数在接口设计文档有写

   - 除了接口定义的字段外，可以增加一些etrDte：委托时间来区分不同时间请求过来的参数 或者 txnDate：交易时间来区分。交易时间的格式可以在config.stream.pfe查看
   - bnkNo：区分是哪个分行的

6. **DateUtil**

   - 生成日期使用工具类生成，可以使用`DateUtils.format`方法可以将时间转化成定义的固定格式，不要直接`new Date()`

7. **BeanUtils**

   - `copyProperties(Object source, Object target)`：可以复制对象中参数值给另一个
   - `toObject(Map<String, Object>, class<T> clazz)`：将`Map`转换成对象
   - `toMap()`：将对象转换成`Map`

8. **JsonUtils**：json的相关工具

   - `jsonFromObject(Map<String, Object>, unicode)`：将对象转换成`json`格式，返回一个`byte[]`，可以加一个`new String()`转换成字符串。第二个参数是编码格式，一般写'`"UTF8"`。

9. `new DefaultContextEx()`：生成一个默认`Context`的方式

10. **判空**：在判空时，建议不要直接`isEmpty()`，有可能对象不存在，就会报错，可以先判断是否为空，再使用`isEmpty()`

    ```java
    Map<String, String> map = null;   // 报NullPointerException
    Map<String, String> map = new HashMap<>(); // 输出true
    System.out.println(map.isEmpty());  
    ```

11. 冗余的代码可以抽象成一个方法

12. 如果一个interface 服务有很多个实现类，可以使用注解`@Resource(name = "className")`

    ```java
    @Resource(name = "serviceImpl")
    private Service serice;  // 这里依旧写的interface
    ```

12. **单元测试**

    1. 如果调用地方的接口的方法不是action里面，而是在service里面，那么就不能够使用@Autowired对action进行注入，这样子会报错：调用不到第三接口；   所以在单元测试的时候，要使用service来调用第三方接口，在使用第三方接口的时候需要使用@InjectMocks，例子如下
    
       ```java
       @Autowired
       @InjectMocks
       private ServiceImpl serviceImpl
       ```
    
    2. 
    
    















