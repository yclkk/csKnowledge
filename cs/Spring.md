

## Java知识

`String.format("%d", x)`跟`printf("%d", x)`，这俩作用差不多，一个是输出到`String`里面，一个是输出到标准输出里

----

**多态**：同一个类调用相同的函数就有不同的行为，多态需要三个条件

- 继承或者实现
- 方法的重写
- 基类引用指向派生类对象，即父类引用指向子类对象
  - 因为子类必然是父类类型，所以父类引用才能 指向子类对象

```java
public class Main {
    public static void main(String[] args) {
      	/*
      		1. 基类Point，有toString()方法
      		2. 子类ColorPoint，radixpoint继承Point重写了toString()方法
      		3. 父类引用指向子类对象
      		4. 多态的应用：
      			 不必每次都是用colorPoint.toString(), radixPoint.toString()
      			 写一个方法getString，里面传入的是父类对象，由于有3. 所以可以直接传入子类对象也能获取结果
      			 这种方式可以缩短代码量。
      			 不光是写方法可以这么用，因为可以用基类代替，因此在初始化的时候也很方便
      	*/
        Point point = new ColorPoint(2, 3, "red");
        Point point1 = new radixPoint(3, 5, 0.5);
        System.out.println(getString(point));
        System.out.println(getString(point1));
    }

    public static String getString(Point point) {
        return point.toString();
    }
}
```

----

- java.util.HashSet<K>：哈希表：有序
- java.util.TreeSet<K>：平衡树：无序

---

### 泛型

- jdk5.0新加的特性

- 在集合中使用泛型

  1. 集合结果或者集合类在jdk5.0时都修改为带泛型的结果

  2. 在实例化集合时，可以指明具体的泛型类型

  3. 指明完以后，在集合类中凡是定义了接口或者类，内部结构使用到了泛型的位置，都指定为了实例化的泛型类型

  4. 范型的类型必须是**类**，不能是基本的数据类型。需要用到基本类型的位置，拿包装类替换

  5. 如果实例化时，没有指明泛型的类型，默认类型为`java.lang.Object`

     ```java
     ArrayList list = new ArrayList();
     ```

---

**自定义泛型接口，类**

- 泛型可能有多个参数，用,隔开<E1, E2, E3>比如Map<K, V>

- 泛型类的构造器如下：public GenericClass(){}

- 实例化后，操作原来泛型位置的结构必须与指定的泛型结构一致

- 泛型的不同引用不能相互赋值

  ```java
  ArrayList<Integer> list1 = null;
  ArrayList<String> list2 = null;
  list1 = list2; // 不允许
  ```

- 泛型如果不指定，将被擦除，泛型对应的类型均按照Object处理，但不等价于Object。**经验：**泛型要使用一路都要用，要不用，一路都不要用

- Jdk1.7之后可以作类型推断：`List<Integer> list = new Array<>();`

- **静态方法**不能使用类的泛型：因为类的泛型是要用的时候才生成，而静态方法是一开始就有了，从生命周期的角度来看，静态方法的时间早于类实例的创建

- 异常类不能是泛型

  ```java
  public class Generic extends Exception{} // 不允许
  public void Generic() {
    try{}catch{} // 不允许
  }
  ```

- 继承可以部分保留泛型

  ```java
  class Father<T1, T2>{}
  
  class Son1 extends Father{} // 不保留，擦除泛型，实例化Son1时，默认为Object
  
  class Son2 extends Father<Integer, String>{} // 具体类型
  
  class Son3<T1, T2, A, B> extends Father<T1, T2>{}   // 全部保留
  
  class Son4<T2, A, B>	 extends Father<Integer, T2>{} // 部分保留
  ```


---

**Class<?>**

> ?表示通配符，代表不确定的类型

通配符表示编译期不确定，但是运行时一定的类型；泛型代表编译期一类的数据。



---

### 反射

> 可以动态的将代码加进在项目里

在`java`中，每一次修改代码都需要重新打包。如果使用了反射，那么这段代码就可以不存在打包后的代码里。有一段频繁修改的代码或者在贪吃蛇中需要用户将代码加进项目里，都可以使用反射

Calculator类

```java
package com.zyc.reflect;

public class Calculator {
    public String name;

    public int a;

    public Calculator(){}

    public Calculator(String name) {
        this.name = name;
    }
    public Calculator(String name, int a) {
        this.name = name;
        this.a = a;
    }

    public int add(int a, int b) {
        return a + b;
    }

    @Override
    public String toString() {
        return name + "," + a;
    }
}
```

Main方法

```java
package com.zyc.reflect;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException, NoSuchFieldException {
      // ?代表不确定类型，
      Class<?> cls = Class.forName("com.zyc.reflect.Calculator");
      // 无参对象
      Object o = cls.newInstance();
      // 获取Calculator的add方法，传入参数的Class类型
      Method method = cls.getMethod("add", int.class, int.class);
      // 是哪一个对象调用了这个方法
      int res = (int) method.invoke(o, 3, 4);
      System.out.println(res);
      // 获取名称为a的成员变量，也可以获取"name"
      Field field = cls.getField("a");
      // 为o对象的域设置值
      field.set(o, 5);
      Field field2 = cls.getField("name");
      field2.set(o, "My Calculator");
      System.out.println(o);
			// 使用Constructor获取有参构造函数
      Constructor<?> constructor = cls.getConstructor(String.class, int.class);
      Object newObject = constructor.newInstance("new Calculator", 9);
      System.out.println(newObject);
    }
}

```

---

### 多线程与锁

#### 多线程

![主线程和其他线程](../src/java/last_lesson_multiThread.png)

**解释**：左边那条线为**主线程**，`worker1,worker2`为中途开的线程，因此在这里边就有了三个线程，线程的执行顺序是随机的。线程看上去是并行做的

[并发和并行的区别](../src/java/并发和并行的区别（图解）.html)

---

继承`Thread`类

```java
package com.zyc.multipleThread;

class Worker1 extends Thread {

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Hello " + this.getName());
            try {
                sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
class Worker2 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Hello " + this.getName());
        }
        try {
            sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Worker1 worker1 = new Worker1();
        Worker2 worker2 = new Worker2();
        worker1.setName("Thread-1");
        worker2.setName("Thread-2");
        worker1.start();
      	worker1.join();
      	// worker1执行完之后才会执行worker2，最后输出hello main
       // 如果把worker1.join()放在worker2.start()之后，那么这两个还是随机执行，最后输出Hello main
        worker2.start();
      	worker2.join();
        System.out.println("Hello Main");
    }
}
```

---

实现`Runnable`接口

```java
package com.zyc.multipleThread;

class Worker1 implements Runnable {

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Thread-1 " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

    }
}

class Worker2 implements Runnable {

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Thread-2 " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

    }
}

public class Main {
    public static void main(String[] args) {
        new Thread(new Worker1()).start();
        new Thread(new Worker1()).start();
      //new Thread(new Worker2()).start();
    }
}

```

---

**常用API**

1. start()：开启一个线程

2. Thread.sleep(): 休眠一个线程

3. join()：等待线程执行结束

4. interrupt()：从休眠中中断线程，有抛出中断的时候才有影响。对`sleep、wait`有影响，如果是执行比较慢的，并不能中断，如下

   ```java
   class Worker1 extends Thread {
       @Override
       public void run() {
           for (int i = 0; i < 10; i++) {
             for (int x = 0; x < 1000; x++) 
               for (int y = 0; y < 1000; y ++)
                 for (int z = 0; z < 1000; z ++)
                   s = (s + x * y * z) % 123;
             System.out.println("Hello " + i + s + this.getName());      
           }
       }
   }
   public class Main {
       public static void main(String[] args) {
           Worker1 worker1 = new Worker1();
           Worker2 worker2 = new Worker2();
           worker1.setName("Thread-1");
           worker2.setName("Thread-2");
           worker1.start();
           worker2.start();
         	worker1.join(5000);// 等待5s
        		worker1.interrupt();
           System.out.println("Hello Main");
       }
   }
   ```

5. setDaemon()：将线程设置为守护线程。当只剩下守护线程时，程序自动退出。比如垃圾回收机制，当所有用户线程结束后自动结束掉，也可以手动设置一个守护线程

   ```java
   //还是按照第一个例子
   public class Main {
     public static void main(String[] args) throws InterruptedException {
       Worker1 worker1 = new Worker();
       Worker2 worker2 = new Worker();
       worker1.setName("Thread-1");
       worker2.setName("Thread-2");
       worker1.setDaemon(true);
       worker2.setDaemon(true);
       worker1.start();
       worker2.start();
       Thread.sleep(5000);
       System.out.println("Hello Main Thread");
     }
   }
   ```

---

#### 锁

例子

> 有两个线程都在执行cnt + 1
>
> 假设cnt = 0，Thread-1取cnt = 0，然后挂载，Thread-2取cnt = 0
>
> 然后cnt + 1，会发现，结果并不正确

```java
package com.zyc.multipleThread;


import static com.zyc.multipleThread.Worker.cnt;

class Worker extends Thread {
    public static int cnt = 0;
    @Override
    public void run() {
        for (int i = 0; i < 100000; i++) {
            cnt ++;
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Worker worker1 = new Worker();
        Worker worker2 = new Worker();
        worker1.setName("Thread-1");
        worker2.setName("Thread-2");
        worker1.start();
        worker2.start();
        worker1.join();
        worker2.join();

        System.out.println(cnt);
    }
}
// 结果并不为20w
```

**第一种方法**

```java
public class Main {
  public static void main(String[] args) throws InterruptedException {
    Worker worker1 = new Worker();
    Worker worker2 = new Worker();
    worker1.setName("Thread-1");
    worker2.setName("Thread-2");
    worker1.start();
    worker1.join();
    
    worker2.start();
    worker2.join();

    System.out.println(cnt);
  }
}
// 这样执行效率太慢，一次只能有一个线程在执行
```

**第二种方法：加锁**

1. 使用`ReentrantLock`

   ```java
   class Worker extends Thread {
       public static int cnt = 0;
       private static ReentrantLock reentrantLock = new ReentrantLock();
       @Override
       public void run() {
           for (int i = 0; i < 100000; i++) {
              reentrantLock.lock();
              try{
                  cnt ++;
              } finally {
                  reentrantLock.unlock();
              }
   
           }
       }
   }
   ```

2. 使用`synchronized`

   - 加在代码块上

   ```java
   class Worker extends Thread {
       public static int cnt = 0;
       private static Object object = new Object();
     
       @Override
       public void run() {
           synchronized (object){
               for (int i = 0; i < 100000; i++) {
                   cnt ++;
               }
           }
       }
   }
   ```

   - 加在函数上，等同于`synchronized(this)`

   ```java
   class Worker implements Runnable {
       public static int cnt = 0;
   
       private synchronized void work() {
         // 等价于synchronized(this){} 因此不同实例加的锁是不一样的，所以结果不会为20w
           for (int i = 0; i < 100000; i ++ ) {
               cnt ++ ;
           }
       }
   
       @Override
       public void run() {
           work();
       }
   }
   ```

   但是可以用`Runnable`接口，原因在于同一个对象可以运用上不同的线程上

   ```java
   public class Main {
       public static void main(String[] args) throws InterruptedException {
           Worker worker = new Worker();
           Thread worker1 = new Thread(worker);
           Thread worker2 = new Thread(worker);
   
           worker1.start();
           worker2.start();
           worker1.join();
           worker2.join();
   
           System.out.println(Worker.cnt);
       }
   }
   
   ```

3. **wait与notify**

   1. wait：线程阻塞
   2. notify唤醒其他被阻塞的线程

### Lambda

#### 双冒号::

[深入理解Java双冒号(::)运算符的使用](https://blog.csdn.net/zhoufanyang_china/article/details/87798829)

#### Optional

`optional.orElse()`与`optional.orElseGet()`

源码

```java
public T orElse(T other) {
  return value != null ? value : other;
}

public T orElseGet(Supplier<? extends T> other) {
  return value != null ? value : other.get();
}
```

调用

```java
// 无论是否为空都会调用createStuden(),然后将返回值传给T other，所以相当于饿汉式
optionalStudent.orElse(createStudent());
// 只有为null才会执行.get(),才会返回createStudent()方法，相当于懒汉式
optionalStudent.orElseGet(new Supplier<Student>() {
  @Override
  public Student get() {
    return createStudent();
  }
});
//可改写lambda->optionalStudent.orElseGet(this::createStudent);
```



----

## 项目（King of bot）

**简介**

> 每名用户有多个bot，每次对战的时候只能派出一个bot去参战，防止一个bot被复制了好多份霸榜
>
> 可以跟其他用户PK，每个bot都有一个天梯分
>
> 也可以不派出bot，用户之间PK

**模块**

PK：匹配界面、实况直播、真人PK

对战列表：Bot回放

排行榜

用户中心：注册、登陆、查看我的Bot（增加、删除、修改）、Bot的对战记录

```mermaid
flowchart TD;
A(模块) --> B(PK)
B --> a(匹配界面)
B --> b(实况直播)
B --> c(真人pk)
A --> C(对战列表)
C --> d(Bot回放)
A --> D(排行榜)
D --> j(Bot列表)
A --> E(用户中心)
E --> f(注册)
E --> g(登陆)
E --> h(我的Bot)
E --> i(Bot的对战记录)

```

---

**前后端分离与不分离**：重点在于拼接地方是在哪

- 分离：
  1. 客户端进入网站的时候，服务端会先返回**静态资源**给客户端。
  2. 客户端再向服务器发送请求，服务器将**数据**返回给客户端
  3. 在客户端将静态资源和数据通过某种方式动态拼接起来
  4. 好处就是在实现不同的接口的时候比如`Web`端和`app`端的时候，因为数据是一样的，不需要写多个后端
- 不分离
  1. 客户进入网站向服务器发送url
  2. 服务端将在服务器生成的完整的页面发送给客户端

----

### 前端

#### 第一节课

1. 确定好前端的导航栏和内容区的布局，去`bootstrap`官网找一个合适的`navbar`布局给导航栏

   在从拷过来的代码中的`class`稍加修改

   ![navbar](../src/first_lesson_navbar.png)

2. 因为navbar是不变的布局，所以放在`App.vue`里，因为该`navbar`使用了`bootstrap`，所以`App.vue`中要使用这个组件的话需要导入`bootstrap`的`css`文件，`js`文件没使用到先导进来也无妨。

   ```vue
   <template>
     <NavBar />
   
     <router-view></router-view>
   
   </template> 
   
   
   <script>
   import  NavBar  from "./components/NavBar.vue"
   import "bootstrap/dist/css/bootstrap.min.css"
   import "bootstrap/dist/js/bootstrap.bundle.min.js"
   export default {
   
     components: {
       NavBar,
     }
   }
   </script>
   
   <style>
   body {
     background-image: url("assets/background.png");
     background-size: cover;
   }
   </style>
   
   ```

3. 给导航栏每一个链接在`views`目录下创建相应的模块文件夹

   ![](../src/first_lesson_views.png)

4. 在`router`路径下创建这些组件的路由

   ```js
   import { createRouter, createWebHistory } from 'vue-router'
   import PkIndexView from "../views/pk/PkIndexView";
   import RankListIndexView from "../views/ranklist/RankListIndexView"
   import ReCordIndexView from '../views/record/ReCordIndexView';  // 写Record就报错，懵
   import NotFound from "../views/error/NotFound";
   import UserBotIndexView from "../views/user/bot/UserBotIndexView";
   
   const routes = [
     {
       name: "home",
       path: "/",
       redirect:"/pk/",
     },
     {
       name:"pk_index",
       path: "/pk/",
       component: PkIndexView
     },
     {
       name: "ranklist_index",
       path: "/ranklist/",
       component: RankListIndexView
     },
     {
       name: "record_index",
       path: "/record/",
       component: ReCordIndexView,
     },
     {
       name: "notFound",
       path: "/404/",
       component: NotFound,
     },
     {
       name: "user_bot_index",
       path: "/user/bot",
       component:UserBotIndexView,
     },
     {
       path:"/:catchAll(.*)", // 不能被以上路径识别的路径会在这里被捕捉
       redirect: "/404/",
   
     }
   
   ]
   
   const router = createRouter({
     history: createWebHistory(),
     routes
   })
   
   export default router
   
   ```

5. 为了使这些路由能够被应用上前端渲染，需要将`navbar`的`a`链接改成`router-link`。`name`为`routes`中定义的`name`

   ```vue
   <router-link class="navbar-brand" :to="{name: 'home'}" >King of bots</router-link>
   ```

6. 使界面美观，需要在页面中间添加`card`，也是去`bootstrap`找一个`card`

   ![card](../src/first_lesson_card.png)

   

   因为这个`card`是所有的页面共用的，因此可以像`navbar`一样创建一个组件，给`card`添加一个`container`，`container`能够自适应屏幕。要填充的内容都会渲染在<slot></slot>里面

   ![contetnField](../src/first_lesson_contetnField.png)

7. 在每个页面文件中导入`ContentField`这个组件

   ![first_lesson_content](../src/first_lesson_content.png)

8. 实现导航栏进入某个链接的时候会高亮`active`

   `computed`：实时计算当前`route`内部是什么。如果需要在某个属性里面使用表达式的话可以在前面加一个`:`

   这里的`route`其实就是路由，跟上面是一个意思

   ![first_lesson_active_2](../src/first_lesson_active_2.png)

   

   ![first_lesson_active](../src/first_lesson_active.png)

   

   ![first_lesson_active_1](../src/first_lesson_active_1.png)

9. 需要动的物体都是以60帧的方式移动，因此可以把这些基本功能抽象成一个基类。在这里用到了前端的`RequestAnimationFrame`

   1. 前面都很好理解，`this.timedelta`代表的是时间差，`last_timestamp`是上一帧执行的毫秒数，`timestamp`是执行时刻的毫秒数

   2. `has_celled_start`表示该对象是否是第一次执行

      每一帧都会执行`step`函数，如果该对象没有被调用，那就调用`start`并将`has_celled_start`设为`true`

      如果是被调用过的，那就执行`update`函数，并且计算出两帧之间的时间差

   ```js
   
   const AC_GAME_OBJECTS = [];
   
   export class AcGameObject {
       
       constructor() {
           AC_GAME_OBJECTS.push(this);
           this.has_celled_start = false;
           this.timedelta = 0;
   
       }
   
       start() {  // 开始时执行一次
   
       }
   
       update() {  // 在start之后每一帧执行一次
           
       }
   
       on_destroy() {  // 删除之前调用
   
       }
   
       destroy() { // 
           this.on_destroy();
           
           for (let i in AC_GAME_OBJECTS) {
               if (this == AC_GAME_OBJECTS[i]) {
                   AC_GAME_OBJECTS.splice(i);
                   break;
               } 
           }
       }
   }
   let last_timestamp;
   
   const step = (timestamp) => {
       for (let obj of AC_GAME_OBJECTS) {
           if (!obj.has_celled_start) {
               obj.has_celled_start = true;
               obj.start();
           } else {
               obj.timedelta = timestamp - last_timestamp;
               obj.update();
           }
       }
       last_timestamp = timestamp;
       requestAnimationFrame(step);
   
   } 
   
   requestAnimationFrame(step);
   ```

10. `ctx`：画布，`parent`：画布的父元素，用来动态修改画布的长宽

    地图会变化，游戏对象应该也是跟着成比例变，因此绝对距离就不重要

    地图是`13*13`的，因此每一个格子都可以看成一个单位，所以可以把格子存为绝对距离，坐标都存为相对距离，`this.L`是一个单位的长度

    ```js
    import { AcGameObject } from "./AcGameObjects";
    
    export class GameMap extends AcGameObject {
        constructor(ctx, parent) {
            super();
            this.ctx = ctx;
            this.parent = parent;
            this.L = 0;  // 地图的一个单位的大小
            this.cols = 13;
            this.rows = 13;  // cols rows 可以自行调整，但是获取地图大小的方式不变
    
        }
    
        start() {
    
        }
    
        update_size() {  // 更新地图，每一帧都要更新地图
            this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));  // 这里是会计算出浮点数的，如果不取整，那么地图就会有断层
            this.ctx.canvas.width = this.L * this.cols;
            this.ctx.canvas.height = this.L * this.rows;
        
        }
    
        update() {  // 在基类有写在什么时候会执行update，所以upate的逻辑是不在基类写的
            this.update_size();
            this.render();
        }
    
        render() {  // 渲染出来，在cdn有写ctx如何画图
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);  
        }
    }
    ```

    **`pk`页面传过来的是`getContext("2d")`的内容了，设置宽度和高度还是需要加`.canvas.width和.canvas.height`**

11. 去掉`Pk`页面的`ContentField`组件，写一个游戏背景`PlayGround`。

    在游戏背景里面放一个地图`GameMap`组件，地图是`13*13`，因此需要边长尽可能的大，需要动态求

    将地图看成是一个是长方形，其实正方形是一个特殊的长方形，如何求变长的最大值

    $min(h / rows, w / cols)$  得到的最小地图的最小单位，然后宽度和高度再用**单位*列或者行数**

    ![the_first_lesson_minWidth](../src/the_first_lesson_minWidth.png)

    

    在`PlayGround`组件写的背景里面不止有游戏界面，还有一些其他界面，所以将其他页面跟`ContentField`分开来写

    `onMounted`：组件挂载完之后需要执行哪些操作

    ```vue
    <template>
        <div ref="parent" class="gamemap">
            <canvas ref="canvas"></canvas>
        </div> 
    </template>
    
    <script>
    import { GameMap } from '../assets/scripts/GameMap';
    import { ref, onMounted} from 'vue';
    
    export default {
        setup() {
            let parent = ref("");  // 将parent 和 canvas指向空
            let canvas = ref("");
    
            onMounted(() => {
                new GameMap(canvas.value.getContext("2d"), parent.value);
            });
    
            return {
                parent,
                canvas,
            }
        }
    }
    </script>
    
    <style scoped>
    div.gamemap {
        width: 100%;
        height: 100%;
      /* 后面三项是将地图居中的*/ 
        display: flex;
        justify-content: center;
        align-items: center;
    
    }
    </style>
    ```

    

12. **画地图的格子**：相邻格子的颜色不一样，可以用横纵坐标之和来区分

    **怎么画：**在`GameMap`里，`render`函数是渲染，因此改一下逻辑即可

    **注意：**在`canvas`里，水平向右是横坐标，垂直向下是纵坐标，又是在对`rows, cols, width, height`的计算中是按常规来算的，所以在使用`fillRect`的时候坐标换一下就好

    ```js
    render() {  // 渲染出来
            const color_even = "#AAD751", color_odd = "#A2D149";
            for (let r = 0; r < this.rows; r ++) {
                for (let c = 0; c < this.cols; c++) {
                    if ((c + r) % 2 == 0) {
                        this.ctx.fillStyle = color_even;
                    } else {
                        this.ctx.fillStyle = color_odd;
                    }
                  	// x：c在变，y：r不变
                    this.ctx.fillRect(this.L * c, this.L * r, this.L, this.L);
                }
            }
        }
    ```

    

13. **画墙：**新建一个墙的组件`Wall.js`，每次只画一个墙，用`GameMap`来计算墙的位置的大小

    ```js
    import { AcGameObject } from "./AcGameObjects";
    
    export class Wall extends AcGameObject {
        constructor(r, c, gamemap) {
            super();
            
            this.r = r;
            this.c = c;
            this.gamemap = gamemap;
            this.color = "#B37226"
        }
    
        update() {
            this.render();
        }
        
        render() {
            const L = this.gamemap.L;
            const ctx = this.gamemap.ctx;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.c * L, this.r * L, L, L);
        }
    }
    ```

    `GameMap`：创建一个建墙函数，下面的`this.walls`是数组成员变量，在构造函数写添加，只是为了保存有哪些墙是被建立的，去掉直接`new Wall`也可以创建出墙

    `g`在这里是一个布尔二维数组，这里的创建二维数组的方式可以学习。没有墙的地方为`false`，有墙的地方为`true`

    ```js
    	 create_wall() {
            const g = [];
            for (let r = 0; r < this.rows; r ++) {
                g[r] = [];
                for (let c = 0; c < this.cols; c++) {
                    g[r][c] = false;
                }
            }
    				// 这两个二维数组是为了创建外围的墙
            for (let r = 0; r < this.rows; r++) {
                g[r][0] = g[r][this.cols - 1] = true;
            }
            
            for (let c = 0; c < this.cols; c ++) {
                g[0][c] = g[this.rows - 1][c] = true;
            }
    
            for (let r = 0; r < this.rows; r ++) {
                for (let c = 0; c < this.cols; c ++) {
                    if (g[r][c]) {
                        this.walls.push(new Wall(r, c, this));
                    }
                }
            }
        }
    
        start() {   
            this.create_wall();
        }
    
    ```

    

14. **生成随机墙、保证左下与右上角不会生成墙和连通性**：对上面的代码加以补充，

    ```js
     	  // 判断连通性，用的Flood Fill算法
    		check_connectivity(g, sx, sy, tx, ty) {
            if (sx == tx && sy == ty) return true;
            g[sx][sy] =  true;
            let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
            for (let i = 0; i < 4; i++) {
                let x = sx + dx[i], y = sy + dy[i];
                if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) {
                    return true;
                }
            }
            return false;
        }
    		create_wall() {
            const g = [];
            for (let r = 0; r < this.rows; r ++) {
                g[r] = [];
                for (let c = 0; c < this.cols; c++) {
                    g[r][c] = false;
                }
            }
            for (let r = 0; r < this.rows; r++) {
                g[r][0] = g[r][this.cols - 1] = true;
            }
            
            for (let c = 0; c < this.cols; c ++) {
                g[0][c] = g[this.rows - 1][c] = true;
            }
            
       		// this.walls_count是构造函数里写的一个成员变量，值自己定义，意思为墙的数量
            for (let i = 0; i < this.walls_count; i++) {
                for (let j = 0; j < 1000; j++) {
                  	/*
                  		1. 循环1000次是为了保证随机能够随机生成成功，不建议死循环，容易写不好把浏览器卡死
                  		2. 为了对称，需要g[r][c], g[c][r]同时判断
                  		3. 第二个if是为了将左下和右上的点排出
                  	*/
                    let r = parseInt(Math.random() * this.rows);
                    let c = parseInt(Math.random() * this.cols);
                    if (g[r][c] || g[c][r]) continue;
                    if (r == 1 && c == this.cols - 2 || r == this.rows - 2 && c == 1) continue;
                    g[r][c] = g[c][r] = true;
                    break; 
                }
            }
    				/*
    					小技巧：利用JSON之间的转换实现深拷贝，这是怕在搜索的过程中影响了原来了g
    					如果连同不了，那这个图就不生成了，需要重新刷新页面
    				*/
            const copy_g = JSON.parse(JSON.stringify(g));
            if (!this.check_connectivity(copy_g,  this.rows - 2, 1, 1, this.cols - 2, )) {
                 return false;
            }
    
    
            for (let r = 0; r < this.rows; r ++) {
                for (let c = 0; c < this.cols; c ++) {
                    if (g[r][c]) {  
                        this.walls.push(new Wall(r, c, this));
                    }
                }
            }
            return true;
        }
    
        start() {   
            // this.create_wall();
          
          	// 如果上面墙的数量多了，这里可以增加i的循环次数，不建议写死循环
          	// 如果生成成功，则不再执行
            for (let i = 0; i < 1000; i++) {
                if (this.create_wall()) {
                    break;
                }
            }
        }
    ```

------

#### 第二节课

1. **避免两条蛇进入到同一个格子**
   
   - 一开始设定的是地图大小是1 3* 13，左下角的点为(11, 1)，右上为(1, 11)，当蛇走一步时，横纵之和会在奇偶之间穿插，如果地图设定为13 * 13，两条蛇就可能进入到同一个格子
   - 将地图更改为满足要求的长方形
   - 非正方形不满足轴对称，考虑换成中心对称
   
   ![the_second_lesson_symmetric](../src/the_second_lesson_symmetric.png)
   
   - 更改画墙的逻辑
   
   ```js
       for (let j = 0; j < 1000; j++) {
         /*
          1. 循环1000次是为了保证随机能够随机生成成功，不建议死循环，容易写不好把浏览器卡死
          2. 为了对称，需要g[r][c], g[c][r]同时判断，后续改为中心对称 
          3. 第二个if是为了将左下和右上的点排出
         */
   
         let r = parseInt(Math.random() * this.rows);
         let c = parseInt(Math.random() * this.cols);
         // 修改了
         if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) {
           continue;
         }
         if (r == 1 && c == this.cols - 2 || r == this.rows - 2 && c == 1) {
           continue;
         }
         // 修改了
         g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
         break; 
       }
   }
   ```
   
   ------
   
1. **画蛇头：**蛇的起点在左下和右下
   
   - 前10步每一步增长一个单位，往后每3步增长一个单位，
   - 蛇是由一堆圆组成的，一条蛇就是一堆圆组成的序列
   - 方便画蛇，定义一个格子`Cell.js`。在`canvas`里坐标系跟定义的是反的，所以先将坐标转换成`canavs`的坐标，因为是要画圆，存下圆心的坐标`(x + 0.5, y + 0.5)`。使用canvas画圆：`ctx.arc()`前两个参数是小圆的终点，第三个是圆的半径，后两个是圆弧的起始角度和终止角度
   
   ```js
   export class Cell {
       constructor(r, c) {
           this.r = r;
           this.c = c;
           this.x = c + 0.5;
           this.y = r + 0.5;
       }
   }
   ```
   
   - 将蛇定义为对象`Snake.js`，构造函数的两个参数都是从GameMap传过来的，定义了蛇的id，颜色，坐标。在第二点说到，蛇是由圆组成的序列，因此在每条蛇都有一个`this.Cells`来存放蛇的序列
   
   ```js
   import { AcGameObject } from "./AcGameObjects";
   import { Cell } from "./Cell";
   
   export class Snake extends AcGameObject{
       constructor(info, gamemap) {
           super();
           this.r = info.r;
           this.c = info.c;
           this.color = info.color;
           this.id = info.id;
           this.gamemap = gamemap;
   
           this.Cells = [
               new Cell(info.r, info.c),
           ]
   
       }
   
       start() {
   
       }
   
       update() { // 每一帧都会渲染
           this.render();
       }
   
       render() {
           const L = this.gamemap.L;
           const ctx = this.gamemap.ctx;
           ctx.fillStyle = this.color;
           for (const cell of this.Cells) {
               // 画圆
               ctx.beginPath();
               ctx.arc(L * cell.x, L * cell.y, L / 2, 0, Math.PI * 2);
               ctx.fill(); // 填充颜色
           }
       }
   
   
   }
   ```
   
   补充`GameMap.js`的构造函数
   
   ```js
   this.snakes = [
               new Snake({id: 0, color: "#4876EC", r: this.rows - 2, c: 1}, this),
               new Snake({id: 1, color: "#F94848", r: 1, c: this.cols - 2}, this),
   
           ]
   ```
   
   
   
   ![the_second_lesson_snakeHead](../src/the_second_lesson_snakeHead.png)
   
   -----
   
1. **让蛇移动**
   
   - 在`Snake`类里写`move`函数，只是一个简答的移动，`timedelta`表示两帧之间的毫秒数，$s=v * t$
   
   ```js
   		update_move() {
          // this.speed 自己设定的成员变量。
      		 // 向右移动，可以随意自己改移动的方向
           this.Cells[0].x += this.speed * this.timedelta / 1000;
       }
       update() {
           this.update_move();
           this.render();
       }
   ```
   
   - 移动时有细节问题：创建一个新的头，其他位置都是不变的，让新的头部朝目的地移动，尾巴就朝着下一个位置动就好了，所以只有头和尾在动，其他地方是不变的，拐角就可以保持原样
   
   ![the_second_lesson_snakeMove](../src/the_second_lesson_snakeMove.png)
   
   --------
   
   - 只有当两条蛇都接收到了下一步指令的时候才会让两条蛇分别朝对应的方向移动。每条蛇不能自己判断自己是否需要移动，应该有一个裁判，裁判放在公共的位置GameMap里
   
     ```js
     GameMap.js
     check_ready() {  // 判断两条蛇是否都准备好下一回合了
             for (const snake of this.snakes) {
                 if (snake.status !== "idle") return false;
                 if (snake.direction === -1) return false;
             }
             return true;
         }
     
     next_step() {  // 让两条蛇进入下一回合
             for (const snake of this.snakes) {
                 snake.next_step();
             }
         }
     
     update() {
             this.update_size();
             if (this.check_ready()) {
                 this.next_step();
             }
             this.render();
         }
     ```
   
   - 如果准备好下一步的时候，每条蛇都要跟新一下状态，表示进到下一回合。如果要知道走下一步是往哪走。有些回合蛇不会变长，有些会，要统计回合数
   
     ```js
     snake.js
     next_step() {  // 蛇的状变为走下一步
             const d = this.direction;
             this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
             this.direction = -1;  // 清空状态
             this.status = "move";
             this.step ++;
             const k = this.cells.length;  // 求小球的数量
             // 每一位小球都向后移动一位
             for (let i = k; i > 0; i--) { 
                 // 第一个不用，就可以产生头部多了一个自己的复制
                 this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
             }
         }
     ```
   
   - 如何获取用户的操作：目前无法从后端获取操作，只能从前端获取。在canvas标签里添加tabindex="0"就可以获取用户的操作了 
   
     ```js
     GameMap.js
     add_listening_events() {
             this.ctx.canvas.focus();
     
             const [snake0, snake1] = this.snakes;
             this.ctx.canvas.addEventListener("keydown", e => {
                 if (e.key === 'w') snake0.set_direction(0);
                 else if (e.key === 'd') snake0.set_direction(1);
                 else if (e.key === 's') snake0.set_direction(2);
                 else if (e.key === 'a') snake0.set_direction(3);
                 else if (e.key === 'ArrowUp') snake1.set_direction(0);
                 else if (e.key === 'ArrowRight') snake1.set_direction(1);
                 else if (e.key === 'ArrowDown') snake1.set_direction(2);
                 else if (e.key === 'ArrowLeft') snake1.set_direction(3);
             });
         }
     ```
   
   - 头部抛出一个新的球，让新的球朝目的地移动
   
     ![the_second_lesson_move](../src/the_second_lesson_move.png)
   
     ```js
     Snake.js
     update_move() {
             // this.cells[0].x += this.speed * this.timedelta / 1000;
             const dx = this.next_cell.x - this.cells[0].x;
             const dy = this.next_cell.y - this.cells[0].y;
             const distance = Math.sqrt(dx * dx + dy * dy);  // 走完一格的距离，所以可以用dx dy distance求角度
     
             // 判断是不是走到了终点，当两个点足够接近的时候就认为已经走在一块了
             if (distance < this.eps) {  // 移到了目标点，应该停下来
                 this.cells[0] = this.next_cell;  // 把目标点存下来作为新的头
                 this.next_cell = null;
                 this.status = "idle";
             } else {  // 不重合
                 const move_distance = this.speed * this.timedelta / 1000; // 实际走的距离
                 this.cells[0].x += move_distance * dx / distance;
                 this.cells[0].y += move_distance * dy / distance;
             }
         }
         update() {
             if (this.status === "move") {
                 this.update_move();
             }
             this.render();
         }
     ```
   
   - 成员变量
   
     ```js
     this.next_cell = null; // 下一步的目标
     this.direction = -1;  // -1表示没有指令，0、1、2、3表示上右下左
     this.status = "idle";  // idle表示静止，move表示正在移动，die表示死亡
     
     this.dr = [-1, 0, 1, 0];  // 4个方向行的偏移量
     this.dc = [0, 1, 0, -1];  // 4个方向列的偏移量
     
     
     this.step = 0;
     this.eps = 1e-2;  // 允许的误差
     ```
   
     ----
   
4. **蛇尾移动**

   - 先判断蛇的长度在当前回合是否增加

     ```js
     Snake.js
     check_tail_increasing() {  // 检测当前回合，蛇的长度是否增加
             if (this.step < 10) return true;
             if (this.step % 3 === 1) return true;
             return false;   
         } 
     ```

   - 蛇尾变长，那就蛇尾不动；如果蛇尾不变长，那么就要跟着蛇头一起动

     ```js
      update_move() {
        // this.cells[0].x += this.speed * this.timedelta / 1000;
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);  // 走完一格的距离，所以可以用dx dy distance求角度
     
        // 判断是不是走到了终点，当两个点足够接近的时候就认为已经走在一块了
        if (distance < this.eps) {  // 移到了目标点，应该停下来
          this.cells[0] = this.next_cell;  // 把目标点存下来作为新的头
          this.next_cell = null;
          this.status = "idle";
     
          if (!this.check_tail_increasing()) {
            this.cells.pop();  // 长度不变，最后一个往前挪了，需要砍掉最后一个
          }
        } else {  // 不重合
          const move_distance = this.speed * this.timedelta / 1000; // 实际走的距离
          this.cells[0].x += move_distance * dx / distance;
          this.cells[0].y += move_distance * dy / distance;
     
          if (!this.check_tail_increasing()) {  // 蛇尾的长度不增加
            const k = this.cells.length;
            const tail = this.cells[k - 1], tail_target = this.cells[k - 2];
            const tail_dx = tail_target.x - tail.x ;
            const tail_dy = tail_target.y - tail.y ;
            tail.x += move_distance * tail_dx / distance;
            tail.y += move_distance * tail_dy / distance; // 因为头尾是一起动的，所以距离通用
     
     
     
          }
        }
      }	
     ```

     ---

5. **将蛇变得好看**

   - 在两个圆之间用长方形覆盖

     ![the_second_lesson_beauty](../src/the_second_lesson_beauty.png)

   - 三种情况：

     - 两个圆重合
     - x轴重合：不确定两个哪个在上，y值取两个圆的最小值
     - y轴重合：不确定两个圆那个在左，取x的最小值
     - 为了更好看，不重合，把宽度画成80%，长度不变，因为长度是两个圆心之间的距离，同时也要将圆的大小画成80%

     ![the_second_lesson_beauty](../src/the_second_lesson_beauty1.png)

     ```js
     Snake.js下的render()
     for (let i = 1; i < this.cells.length; i++) {
       const a = this.cells[i - 1], b = this.cells[i];
       if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) continue;
       if (Math.abs(a.x - b.x) < this.eps) {
         ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L);
       } else {
         ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8);
       }
     }
     ```

     ----

6.  **检测目标格子是否非法**

   - GameMap作为裁判

     ```js
     check_valid(cell) {
       for (const wall of this.walls) {  // 判断墙
         if (cell.r === wall.r && cell.c === wall.c) {
           return false;
         }
       }
       for (const snake of this.snakes) {
         let k = snake.cells.length;
         if (!snake.check_tail_increasing()) {// 当蛇尾会前进的时候，蛇尾不要判断
           k--;
         }
         for (let i = 0; i < k; i ++) {  // 判断蛇的身体
           if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c) {
             return false;
           }
         }
       }
       return true;
     }
     ```

   - 在Sanke.js的next_step函数判断下一步的合法性

     ```js
     if (!this.gamemap.check_valid(this.next_cell)) { // 下一步操作非法，蛇死亡
       this.status = "die";
     }
     ```

   - render函数渲染死亡蛇的效果

     ```js
     if (this.status === "die") {
       this.color = "white";
     } 
     ```

     ---

7. **给蛇加眼睛**

   - 当蛇的方向不同的时候，**蛇的眼睛也在不同的**

     ```js
     this.eye_direction = 0;
     if (this.id === 1) this.eye_direction = 2; // 左下角蛇头朝上，右上角朝下
     
      next_step() {  // 蛇的状变为走下一步
        this.eye_direction = d;  // 改变眼睛的方向
     ```

   - 计算不同方向蛇的眼睛的偏移量，蛇的眼睛为黑色

     ![the_second_lesson_eyes](../src/the_second_lesson_eyes.png)

     ```js
     //render()渲染眼睛
     for (let i = 0; i < 2; i ++) { // 遍历2次是画2个眼珠，偏移量为0.15，半径为0.05L
       ctx.fillStyle = "black";
       const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.15) * L;
       const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.15) * L;
       ctx.beginPath();
       ctx.arc(eye_x, eye_y, 0.05 * L, 0, Math.PI * 2);
       ctx.fill();
     }
     ```

     -----

### 后端

-----

#### Mysql

##### 第一节课

###### 1. 添加依赖

> 去maven仓库搜索相关以来，添加到pom.xml

- mybatis-plus-generator：自动生成一些函数，比如mapper之类的
- mybatis-plus-boot-starter：帮我们写了很多mysql
- Project Lombok：简化代码
- spring-boot-starter-security：权限判断模块
- jjwt-api
- jjwt-impl
- jjwt-jackson

###### 2. springboot访问数据库

> 如同终端和其他图形化页面一样，springboot连接mysql时也需要配置用户名和密码

###### 3. springboot中常用模块

- pojo层：`table -> class`。将数据库中的表对应成Java中的Class。

  - sql注入springboot已经帮我们实现了

- mapper层：`class中的语句 -> sql`（也叫Dao层）：将pojo层的class中的操作，映射成sql语句。

- service层：写具体的==业务==逻辑，组合使用mapper中的操作

- controller层：==调度service==。负责请求转发，接受==（前端）==页面过来的参数，传给Service处理，接到返回值，再传给页面。

  ```mermaid
  graph LR
  A(pojo) --> B(mapper) 
  B --> C(service)
  C --> D(controller)
  
  ```

###### 4. `MyBatis-Plus`

- 条件构造器：`QueryWrapper`

  > 继承自 AbstractWrapper ,自身的内部属性 **entity 也用于生成 where 条件**
  > 及 LambdaQueryWrapper, 可以通过 new QueryWrapper().lambda() 方法获取

  **例子**

  ```java
  @GetMapping("/user/{userId}/")
  public User getUser(@PathVariable int userId) {
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("id", 1);  // 可以在官网查，有很多操作，比如lt gt ge le
    													// 同时支持连贯操作: ge().le()，实现>= && <= 
    return userMapper.selectOne(queryWrapper);
  }
  ```

- `Mapper`

  **例子**

  ```java
  @GetMapping("/user/add/{userId}/{username}/{rating}")  // 插入和删除一般是使用Post
  public String insertUser(@PathVariable int userId,
                           @PathVariable String username,
                           @PathVariable int rating) {
    User user = new User(userId, username, rating);
    userMapper.insert(user);
    return "add successfully";
  }
  ```

---

###### 5. **用户认证**：权限判断

- 加了spring-boot-starter-security依赖之后就帮我们实现了很多页面。没有登录时登陆页面的用户名是user，密码在项目运行里有写

  ![the_second_lesson_judgement](../src/the_second_lesson_login.png)

  ![the_second_lesson_judgement](../src/the_second_lesson_logout.png)

- **传统的用户登陆方式**

  1. 正常登陆：`Client --> SpringBoot(server) --> mysql`，然后结果返回`mysql --> SpringBoot(server) --> Client`
  2. 正常登陆完之后，`Springboot`生成一个随机字符串`sessionId`发送给`Client`，`Client`将`sessionId`存到`cookie`，一般这个`sessionId`会存在`mysql`或者`redis`里
  3. 用户再次请求时，`Client`会发送`cookie`，`springboot`会取`cookie`中的`sessionId`值，然后取跟`mysql`匹配，同时看看`sessionId`有没有过期，`mysql`中存的不只是`sessionId`，还有比如用户名之类的数据
  4. 如果`sessionId`过期了，那么`server`就会发送一个登陆页面给`Client`

  ![the_second_lesson_judgement](../src/the_second_lesson_traditionalLogin.png)

- 将spring-security对接数据库，不再限于只有一个user登陆

  1. 实现service.impl.UserDetailsServiceImpl类，实现UserDetailsService接口

  2. 重写接口的方法：通过username返回一个**UserDetails**，里面包含用户名和密码

     ```java
     @Override
     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         QueryWrapper<User> queryWrapper = new QueryWrapper<User>();
         queryWrapper.eq("username", username);
         User user = userMapper.selectOne(queryWrapper);
         if (user == null) {
           throw new RuntimeException("用户不存在");
         }
         return new UserDetailsImpl(user);
       }
     ```
     
  3. 在service.utils下创建UserDetailsImpl实现UserDetails接口，同时有很多is...方法，根据自己的需要改为true还是false
  
     ```java
     @Data
     @NoArgsConstructor
     @AllArgsConstructor
     public class UserDetailsImpl implements UserDetails {
     
         private User user;
     
         @Override
         public Collection<? extends GrantedAuthority> getAuthorities() {
             return null;
         }
     
         @Override
         public String getPassword() {
             return user.getPassword();
         }
     
         @Override
         public String getUsername() {
             return user.getUsername();
         }
     
         @Override
         public boolean isAccountNonExpired() {
             return true;
         }
     
         @Override
         public boolean isAccountNonLocked() {
             return true;
         }
     
         @Override
         public boolean isCredentialsNonExpired() {
             return true;
         }
     
         @Override
         public boolean isEnabled() {
             return true;
         }
     }
     ```
  
  4. 这个时候去验证用户名密码，会报一个错：There is no PasswordEncoder mapped for the id "null"，这是因为密码是使用的明文传输，可以去用户的密码前缀加上{noop}，springboot在去判断密码的时候就知道这个是明文密码
  
- **加密**

  ```mermaid
  graph LR;
  
  a(加密前的字符串) --容易转换--> b(加密后的字符串)
  b(加密后的字符串) --不容易转换--> a(加密前的字符串) 
  ```

  1. 创建config.SecurityConfig类，spring-security会调用这个方法，因为有注解，然后会返回某种加密方式，跟前面的报错对应上。PasswordEncoder应该是一个接口，BCryptPasswordEncoder应该是实现了PasswordEncoder接口，可以查看里面有很多API

     ```java
     @Configuration
     @EnableWebSecurity
     public class SecurityConfig {
     
         @Bean
         public PasswordEncoder passwordEncoder() {
             return new BCryptPasswordEncoder();
         }
     }
     ```

  2. 测试BCryptPasswordEncoder的加密，加密的字符串不是每一次都一样的，但是使用matches()是可以匹配上的

     ```java
     @Test
     	void contextLoads() {
     		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
     		System.out.println(passwordEncoder.encode("zyc")); 
     		System.out.println(passwordEncoder.encode("zyc"));
     		System.out.println(passwordEncoder.matches("zyc", "$2a$10$t/g4ReQX1PXS6R15qPlqTOmzK4DB1epTUKSrWzB7ezKgF3LtJUBkK"));
     		System.out.println(passwordEncoder.matches("zyc", "$2a$10$rP/xwjlFw62wRmCu26IKOO67jkz99Dzok7xaIonbsE5z3Z8Wrthwa"));
     	}
     ```

  3. 改善userController里的insertUser方法，存储加密后的密码

     ```java
     @GetMapping("/user/add/{userId}/{username}/{rating}")
     public String insertUser(@PathVariable int userId, @PathVariable String username, @PathVariable String password) {
          PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
          String encodeedPassword = passwordEncoder.encode(password);
          User user = new User(userId, username, encodeedPassword);
          userMapper.insert(user);
          return "add successfully";
      }
     ```


---

##### 第二节课

###### 1. **公开url与授权url**

- **sesson模式的公开url与授权url**

  1. 在公开的login页面登陆，会生成一个sessionID，将sessionID的与用户的映射存到内存或者数据库里，

  2. 在授权的url页面中，会判断sessionID是否有效

  3. 将User提取到上下文中：在controller中通过某种接口将user提取出来

  4. 可以正常访问

     ![the_forth_lesson_publicurl](../src/the_forth_lesson_publicurl.png)
     
     -----

- **跨域下的公开与授权url：jwt-toekn验证**

  1. 在多台服务器下使用使用session的时候需要将多份sesson复制到多台服务器上，比较麻烦

  2. jwt可以很容易跨域，并且不需要在多台服务器上存储：只要使用一个令牌

  3. 在客户端存的session变成jwt-token

  4. 

  5. 在服务端存userId，密钥，userId + 密钥 --> 加密后的字符串，这是不可逆的，将userId + 加密后的字符串作为jwt-token，如何在客户端串改userId，因为密钥用户不知道，因此无法认证成功

     ![the_forth_lesson_publicurl](../src/the_forth_lesson_jwttoken.png)

  6. 减少jwt-token被窃取的做法：设置两个token为access-token寿命为5mintus、refresh-token寿命为14天，在使用get明文请求的时候，使用access-token；使用post请求就用refresh-token去刷新access-toen

  ----

###### 2. **配置**Jwt

1. **实现utils.JwtUtil类，为jwt的工具类，用来创建、解析jwt token**

```java
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {
    public static final long JWT_TTL = 60 * 60 * 1000L * 24 * 14;  // 有效期14天
  	// 密钥要足够长，随机
    public static final String JWT_KEY = "SDFGjhdsfalshdfHFdsjkdsfds121232131afasdfac";

    public static String getUUID() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public static String createJWT(String subject) {
        JwtBuilder builder = getJwtBuilder(subject, null, getUUID());
        return builder.compact();
    }
  // 将一个字符串+密钥+有效期生成一个加密后的字符串
    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if (ttlMillis == null) {
            ttlMillis = JwtUtil.JWT_TTL;
        }

        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        return Jwts.builder()
                .setId(uuid)
                .setSubject(subject)
                .setIssuer("sg")
                .setIssuedAt(now)
                .signWith(signatureAlgorithm, secretKey)
                .setExpiration(expDate);
    }

    public static SecretKey generalKey() {
        byte[] encodeKey = Base64.getDecoder().decode(JwtUtil.JWT_KEY);
        return new SecretKeySpec(encodeKey, 0, encodeKey.length, "HmacSHA256");
    }
	// 将令牌里的userid解析出来
    public static Claims parseJWT(String jwt) throws Exception {
        SecretKey secretKey = generalKey();
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }
}

```

2. **配置三个依赖**

3. **实现config.filter.JwtAuthenticationTokenFilter类，用来验证jwt-token，如果验证成功，将User信息注入到上下文中**

   ```java
   import com.kob.backend.mapper.UserMapper;
   import com.kob.backend.pojo.User;
   import com.kob.backend.service.impl.utils.UserDetailsImpl;
   import com.kob.backend.utils.JwtUtil;
   import io.jsonwebtoken.Claims;
   import org.jetbrains.annotations.NotNull;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
   import org.springframework.security.core.context.SecurityContextHolder;
   import org.springframework.stereotype.Component;
   import org.springframework.util.StringUtils;
   import org.springframework.web.filter.OncePerRequestFilter;
   
   import javax.servlet.FilterChain;
   import javax.servlet.ServletException;
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   import java.io.IOException;
   
   @Component
   public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
       @Autowired
       private UserMapper userMapper;
   
       @Override
       protected void doFilterInternal(HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain filterChain) throws ServletException, IOException {
           String token = request.getHeader("Authorization");
   
           if (!StringUtils.hasText(token) || !token.startsWith("Bearer ")) {
               filterChain.doFilter(request, response);
               return;
           }
   
           token = token.substring(7);
   
           String userid;
           try {
               Claims claims = JwtUtil.parseJWT(token);
               userid = claims.getSubject();
           } catch (Exception e) {
               throw new RuntimeException(e);
           }
   
           User user = userMapper.selectById(Integer.parseInt(userid));
   
           if (user == null) {
               throw new RuntimeException("用户名未登录");
           }
   
           UserDetailsImpl loginUser = new UserDetailsImpl(user);
           UsernamePasswordAuthenticationToken authenticationToken =
                   new UsernamePasswordAuthenticationToken(loginUser, null, null);
   
           SecurityContextHolder.getContext().setAuthentication(authenticationToken);
   
           filterChain.doFilter(request, response);
       }
   }
   ```

4. **配置`config.SecurityConfig`类，放行登陆、注册等接口**

   ```java
   import com.kob.backend.config.filter.JwtAuthenticationTokenFilter;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.http.HttpMethod;
   import org.springframework.security.authentication.AuthenticationManager;
   import org.springframework.security.config.annotation.web.builders.HttpSecurity;
   import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
   import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
   import org.springframework.security.config.http.SessionCreationPolicy;
   import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
   import org.springframework.security.crypto.password.PasswordEncoder;
   import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
   
   @Configuration
   @EnableWebSecurity
   public class SecurityConfig extends WebSecurityConfigurerAdapter {
       @Autowired
       private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;
   
       @Bean
       public PasswordEncoder passwordEncoder() {
           return new BCryptPasswordEncoder();
       }
   
       @Bean
       @Override
       public AuthenticationManager authenticationManagerBean() throws Exception {
           return super.authenticationManagerBean();
       }
   
       @Override
       protected void configure(HttpSecurity http) throws Exception {
           http.csrf().disable()
                   .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                   .and()
                   .authorizeRequests()
             // *这段代码比较关键，公开url，可以随意添加
                   .antMatchers("/user/account/token/", "/user/account/register/").permitAll()
                   .antMatchers(HttpMethod.OPTIONS).permitAll()
                   .anyRequest().authenticated();
   
           http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
       }
   }
   ```

   -----

###### 3. **编写API**

1. **将数据库中的id域变为自增、pojo.User类中添加注解：@TableId(type = IdType.AUTO)**

   -----

2. **实现/user/account/token/：验证用户名密码，验证成功后返回jwt token（令牌）**

   - 创建service.user.account.LoginService

     ```java
     public interface LoginService {
         public Map<String, String> getToken(String username, String password) ;
     }
     ```

   - 实现service.impl.user.account.LoginServiceImpl

     `UsernamePasswordAuthenticationToken`：加密名文的用户名和密码

     `Authentication`：验证用户密码

     `JwtUtil.createJWT`：生成jwt-token，可以看jwt-token的流程图

     ```java
     @Service
     public class LoginServiceImpl implements LoginService {
         @Autowired
         private AuthenticationManager authenticationManager;
     
         @Override
         public Map<String, String> getToken(String username, String password) {
            //将数据库中明文的用户名和密码封装成加密后的
             UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                     = new UsernamePasswordAuthenticationToken(username, password); 
             // 验证账号密码是否登陆 加有个API：.var能自动生成变量类型和变量名
             // 如果登陆失败，会自动处理
             Authentication authenticate = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
             // 登陆成功，获取用户, 过程可以参考spring-security对接数据库那一块
             UserDetailsImpl loginUser = (UserDetailsImpl) authenticate.getPrincipal();
             User user = loginUser.getUser();
     
             // 将userId封装成一个令牌，也就是jwt token
             String jwt = JwtUtil.createJWT(user.getId().toString());
     
             Map<String, String> map = new HashMap<>();
             // 这里是看习惯。把所有信息都存到error_message里
             map.put("error_message", "success");
             map.put("token", jwt);
             return map;
         }
     }
     ```

   - 实现Controller类的方法，使用Post请求

     ```java
     @Autowired
     private LoginService loginService;
     
     @PostMapping("/user/account/token/")
     public Map<String, String> getToken(@RequestParam Map<String, String> map) {
         String username = map.get("username");
         String password = map.get("password");
         return loginService.getToken(username, password);
     }
     ```

   - 调试，在前端内使用`ajax`调试

     ```js
     setup() {
       $.ajax ({
         url: "http://127.0.0.1:3000/user/account/token/",
         type: "POST",
         data: {
           username: "zyc",
           password: "zyc"
         },
         success: function(resq) {
           console.log("success");
           console.log(resq);
         },
         error: function() {
           console.log("error");
         }
       })
     }
     ```

   - token可以在[jwtio](https://jwt.io/)解析出userId

   ------

3. **实现/user/account/info/：根据令牌返回用户信息**

   - 获取了jwt-token之后，user就被放在上下文，从上下文中提取user的信息

   - 在inforServiceImpl实现getInfo。这里有几个要**注意的点**

     1. `UsernamePasswordAuthenticationToken`继承`Authentication`，所以在前面的getToken方法中使用了`.getPrincipal()`，这是`Authentication`的方法，自然`UsernamePasswordAuthenticationToken`也能使用
     2. `getAuthentication()`得到的类型是`Authentication`，看源码的

     ```java
     @Override
     public Map<String, String> getInfo() {
         UsernamePasswordAuthenticationToken authentication = 
         (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
         UserDetailsImpl loginUser = (UserDetailsImpl) authentication.getPrincipal();
         User user = loginUser.getUser();
         Map<String, String> map = new HashMap<>();
         map.put("error_message", "success");
         map.put("id", user.getId().toString());
         map.put("username", user.getUsername());
         map.put("photo", user.getPhoto());
         return map;
         }
     ```

   - 实现 InfoController 的方法，使用get请求

     ```java
     @Autowired
     private InfoService infoService;
     
     @GetMapping("/user/account/info/")
     public Map<String ,String> getInfo() {
         return infoService.getInfo();
     }
     ```

   - 调试，需要发送`headers`，在`config.filter.JwtAuthenticationTokenFilter`里有写，`Bearer`

     ```js
     $.ajax({
         url: "http://127.0.0.1:3000/user/account/info/",
         type: "GET",
         headers: {
           Authorization: "Bearer "+ "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzYTA5N2Q0MjAyODI0YWQ4ODVlMzJlNjRiY2Y4NmUzNSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2Mzc0MTk1MiwiZXhwIjoxNjY0OTUxNTUyfQ.YOif0YbePfItzV3n-GZJi_-j_J7Uz0rC6o8NZxQFswA",
         },
         success: function(resp) {
           console.log("infoSuccess");
           console.log(resp);	
         },
         error: function(resp) {
           console.log("infoError")
           console.log(resp);
         },
       })
     ```

   ----

4. **实现 /user/account/register/ ：注册账号**

   - 创建`service.user.account.RegisterService`

     ```java
     public interface RegisterService {
       	public Map<String, String> register(String username, String password, String confirmedPassword);
     }	
     ```

   - 实现`service.impl.user.accouont.RegisterServceImpl`

     ```java
     @Service
     public class RegisterServiceImpl implements RegisterService {
     
         @Autowired
         private UserMapper userMapper;
     
         @Autowired
         private PasswordEncoder passwordEncoder;
     
         @Override
         public Map<String, String> register(String username, String password, String confirmedPassword) {
             Map<String, String> map = new HashMap<>();
     
             if (username == null) {
                 map.put("error_message", "用户名不能为空");
                 return map;
             }
             username = username.trim();
             if (username.length() == 0) {
                 map.put("error_message", "用户名不能为空");
                 return map;
             }
             if (username.length() > 100) {
                 map.put("error_message", "用户名过长");
                 return map;
             }
             if (password == null || confirmedPassword == null) {
                 map.put("error_message", "密码不能为空");
                 return map;
             }
             if (password.length() == 0 || confirmedPassword.length() == 0) {
                 map.put("error_message", "密码不能为空");
                 return map;
             }
             if (password.length() > 100 || confirmedPassword.length() > 100) {
                 map.put("error_message", "密码过长");
                 return map;
             }
             if (!password.equals(confirmedPassword)) {
                 map.put("error_message", "密码不一致");
                 return map;
             }
             // 判断用户名是否存在
             QueryWrapper<User> queryWrapper = new QueryWrapper<>();
             queryWrapper.eq("username", username);
             // 查user也可以，命名跟下面user不冲突就行
             List<User> users = userMapper.selectList(queryWrapper);
             if (!users.isEmpty()) {
                 map.put("error_message", "用户已存在");
             }
     
             // 加密密码
             String encodedPassword = passwordEncoder.encode(password);
           	// 照片链接先固定
             String photo = "https://www.acwing.com/user/profile/index/";
             User user = new User(null, username, encodedPassword, photo);
             userMapper.insert(user);
             map.put("error_message", "success");
             return map;
         }
     }
     ```

   - **实现RegisterController的方法，使用Post请求**

     ```java
     @Autowired
     private RegisterService registerService;
     
     @PostMapping("/user/account/register/")
     public Map<String, String> register(@RequestParam Map<String, String> map) {
         String username = map.get("username");
         String password = map.get("password");
         String confirmedPassword = map.get("confirmedPassword");
         return registerService.register(username, password, confirmedPassword);
     }
     ```

   - 调试

     ```js
     $.ajax({
         url: "http://127.0.0.1:3000/user/account/register/",
         type: "POST",
         data: {
           username: "zz",
           password: "123",
           confirmedPassword: "123",
         },
         success: function(resp) {
           console.log(resp);
         },
         error: function(resp) {
           console.log("error");
           console.log(resp);
         }
     })
     ```

-----

###### 4. 前端登陆页面

1. **创建`user/account/UserAccountLoginView.vue`，前面两个`div`是`bootstarp`的`grid`**

   ```vue
   <template>
       <ContentField >
           <div class="row justify-content-md-center">
               <div class="col-3">
                   <form>
                       <div class="mb-3">
                           <label for="username" class="form-label">用户名</label>
                           <input type="text" class="form-control" id="username" placeholder="请输入用户名">
                       </div>
                       <div class="mb-3">
                           <label for="password" class="form-label">密码</label>
                           <input type="password" class="form-control" id="password" placeholder="请输入密码">
                       </div>
                       <button type="submit" class="btn btn-primary">提交</button>
                   </form>
               </div>
           </div>
       </ContentField>
   </template>
   
   <script>
   import ContentField from "../../../components/ContentField"
   
   export default {
       components: {
           ContentField
       }
   }
   </script>
   
   <style scoped></style>
   ```

   ----

2. **在`router/index.js`添加组件的路由**

   ```js
   import UserAccountLoginView from "../views/user/account/UserAccountLoginView";
   const routes = [
     {
       name: "user_account_login",
       path: "/user/account/login/",
       component: UserAccountLoginView
     },
   ```

   ----

3. **将用户信息存成全局的，使用==vuex==**

   - 创建`store/user.js`

   ```js
   import $ from "jquery";
   
   export default {
       state: {
           id : "",
           username: "",
           photo: "",
           token: "",
           is_login: "false",
       },
       mutations: {  //mutations 用来修改数据的
           updateUser(state, user) {
               state.id = user.id;
               state.username = user.username;
               state.photo = user.photo;
               state.is_login = user.is_login;
           },
           updateToken(state, token) {
               state.token = token;
           }
       },
       actions: {
         // 使用mutation修改数据
           login(context, data) {
               $.ajax({
                   url: "http://127.0.0.1:3000/user/account/token/",
                   type: "POST",
                   data: {
                       username: data.username,
                       password: data.password,
                   },
                   success: function(resp) {
                       // 调用mutations的函数需要用commit("function")
                       if (resp.error_message === "success") {
                           context.commit("updateToken", data.token);
                           data.success(resp);
                       } else {
                           data.error(resp);
                       }
                   },
                   error: function(resp) {
                       data.error(resp);
                   }
               })
           }
       },
       modules: {
       }
   }
   ```

   ​	在`store/index.js`的`moduels`添加上

   ```js
   import { createStore } from 'vuex'
   import ModuleUser from './user'
   
   export default createStore({
     state: {
     },
     mutations: {
     },
     actions: {
     },
     modules: {
       user: ModuleUser,
     }
   })
   ```

   - 完善`UserAccountLoginView.vue`的`html`部分，验证用户名密码，获取token。登陆成功跳转到首页，用router.push

     ```vue
     <template>
         <ContentField>
             <div class="row justify-content-md-center">
                 <div class="col-3">
                     <!-- prevnet 阻止默认行为 -->
                     <form @submit.prevent="login" >  
                         <div class="mb-3">
                             <label for="username" class="form-label">用户名</label>
                             <!-- 跟ref的username绑定起来 -->
                             <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                         </div>
                         <div class="mb-3">
                             <label for="password" class="form-label">密码</label>
                             <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                         </div>
                         <div class="error-message">{{error_message}}</div>
                         <button type="submit" class="btn btn-primary">提交</button>
                     </form>
                 </div>
             </div>
         </ContentField>
     </template>
     
     <script>
     import ContentField from "../../../components/ContentField"
     import { useStore } from "vuex";
     import { ref } from "vue";
     import router from "../../../router/index"
     
     export default {
         components: {
             ContentField
         },
         setup() {
             const store = useStore();
             let username = ref('');
             let password = ref('');
             let error_message = ref('');
             
             const login = () => {
             	  // 清空信息
                 error_message.value = "";
                 //要使用actions里的函数需要使用dispatch
                 // login后面就是data对象，在actions里面是使用data来调用success和error
                 store.dispatch("login", {
                     username: username.value,
                     password: password.value,
                     success: function() {
                         // 跳转到name为home的页面
                         router.push({ name: 'home'});
                     },
                     error: function() {
                         error_message.value = "用户名或者密码错误";
                     }
                 })
             }
             return {
                 username,
                 password,
                 error_message,
                 login,
             }
         }
     }
     </script>
     
     <style scoped>
     .error-message {
         color: red;
     }
     </style>
     ```

   ---

4. **给后端发送请求，获取用户名、头像、id**





1. 



















​	

----

### 注解

1. **Controller**
   - `@Controller`
   - `@RestController`：该`controller`返回的是**数据**
   - `@RequsetMapping("path")`：在类外写就是父目录，在函数外写子目录，进入该路径执行这个函数，总路径是父+子
     - `GetMapping`：只映射Get请求。
       - `GetMapping("path/{variable}")`：可以传变量，在方法名里通过注解`@PathVariable`获取变量
     - `PostMapping`：只映射Post请求
   - `@RequestParam`：获取请求中的参数，可以放在方法的参数列表里
1. **pojo**
   - `@Data`：自动帮我们填充比如`	tostring, get, set`
   - `@NoArgsConstructor`：填充无参构造函数
   - `@AllArgsConstructor`：有参构造函数
1. **mapper**
   - `@Mapper`
   - `mybatis plus`帮我们实现了很多`sql`语句，因此可以继承`BaseMapper<T>`从而实现`mybaits plus`。其中`T`是指`pojo`层中定义的`class`
1. **Service**
   - `@Service`：serviceImpl的注解 
1. **其他**
   - `Autowired`：如果在某层想要使用其他层的接口或者类



### 补充

1. `target`目录就是编译完之后的结果
1. 在pojo层对表中列的属性类型是需要转换成对象类型，比如`int -> Integer`
1. windows下`alt + insert`，mac下`cmd + n`可以快捷生成一些东西
1. `service`一般喜欢返回`Map`















