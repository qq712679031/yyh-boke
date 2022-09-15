## 1、JVM是什么

JVM是Java Virtual Machine（Java虚拟机）的缩写，JVM是一种用于计算设备的规范，它是一个虚构出来的计算机，是通过在实际的计算机上仿真模拟各种计算机功能来实现的。

* Java语言的一个非常重要的特点就是与平台的无关性。而使用Java虚拟机是实现这一特点的关键。
* 一般的高级语言如果要在不同的平台上运行，至少需要编译成不同的目标代码。而引入Java语言虚拟机后，Java语言在不同平台上运行时不需要重新编译。
* Java语言使用Java虚拟机屏蔽了与具体平台相关的信息，使得Java语言编译程序只需生成在Java虚拟机上运行的目标代码（字节码），就可以在多种平台上不加修改地运行。Java虚拟机在执行字节码时，把字节码解释成具体平台上的机器指令执行。这就是Java的能够“一次编译，到处运行”的原因。

## 2、Java对象编译过程

![1540348687717](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540348687717.png)

源文件编译成字节码，主要分成两个部分：

1：常量池：所有的Token（类名、成员变量名等）、符号的引用（方法引用、成员变量应用等）

2：方法字节码：各个类中的各个方法的字节码

字节码由Java虚拟机解析运行分成两个部分：

1：类加载

2：类的执行

## 3、JVM类加载机制

### 3.1 什么是类加载

类的加载指的是将类的.class文件中的二进制数据读入到内存中，将其放在运行时数据区的方法区内，然后在堆区创建一个java.lang.Class对象，用来封装类在方法区内的数据结构。

注意：JVM主要在程序第一次主动使用类的时候，才会去加载该类，也就是说，JVM并不是在一开始就把一个程序就所有的类都加载到内存中，而是到不得不用的时候才把它加载进来，而且只加载一次。



### 3.2 类加载器

![1540349513792](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540349513792.png)

**1）Bootstrap ClassLoader**

负责加载$JAVA_HOME中jre/lib/rt.jar里所有的 class，由 C++ 实现，不是 ClassLoader 子类。

**2）Extension ClassLoader**

负责加载Java平台中扩展功能的一些 jar 包，包括$JAVA_HOME中jre/lib/*.jar或-Djava.ext.dirs指定目录下的 jar 包。

**3）App ClassLoader**

负责加载 classpath 中指定的 jar 包及目录中 class。

**4）Custom ClassLoader**

属于应用程序根据自身需要自定义的 ClassLoader，如 Tomcat、jboss 都会根据 J2EE 规范自行实现 ClassLoader。

### 3.3 类加载器加载顺序

加载过程中会先检查类是否被已加载，检查顺序是自底向上，从 Custom ClassLoader 到 BootStrap ClassLoader 逐层检查，只要某个 Classloader 已加载就视为已加载此类，保证此类只所有 ClassLoader 加载一次。而加载的顺序是自顶向下，也就是由上层来逐层尝试加载此类。

![1540349316627](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540349316627.png)

#### 3.3.1 验证代码

~~~java
public class ClassLoaderTest {
    public static void main(String[] args) {
        ClassLoader loader = Thread.currentThread().getContextClassLoader();
        System.out.println(loader);
        System.out.println(loader.getParent());
        System.out.println(loader.getParent().getParent());
    }
}
~~~

在获取ExtClassLoader的父loader的时候出现了null，这是因为Bootstrap Loader（引导类加载器）是用C++语言实现的，找不到一个确定的返回父Loader的方式，于是就返回null。

![1540351166729](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540351166729.png)

## 4、JVM运行时内存数据区

![1540349715440](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540349715440.png)

### 4.1 概念解读

#### 4.1.1 方法区

方法区和java堆一样，是线程共享的区域；

**方法区的作用的就是用来存储：已经被虚拟机加载的类信息、常量、静态变量等**；

而且方法区还有另一种叫法：【非堆】，也有人给方法区叫做永久代

当方法区存储信息过大时候，也就是无法满足内存分配的时候报错。

##### 4.1.1.1 运行时常量池

运行时常量池是方法区中的一部分，主要是用来存放程序编译期生成的各种字面量和符号引用，也就是在类加载之后会进入方法区的运行时常量池中存放

#### 4.1.2 Java堆

Java堆是Java虚拟机管理内存最大的一块区域；并且Java堆是被所有线程共享的一块内存区域（最大的区域）；

对于堆内存唯一的目的就是用来存放对象实例的，而且几乎所有的对象实例都是堆内存中分配的内存（可能会有一些对象逃逸分析技术会导致对象实例不是在Java堆中进行内存分配的）

经常会听到一些程序说“调优”，其中调优的95%部分都是在跟Java堆有关系的；

因为**Java堆是垃圾收集器管理的主要区域**；

#### 4.1.3 虚拟机栈

![1540350674435](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540350674435.png)

**程序员经常说“堆栈”，其中的栈就是虚拟机栈**，更确切的说，大家谈的栈是虚拟机中的局部变量表部分；

虚拟机栈描述的是：Java方法执行的内存模型；（说白了就是：虚拟机栈就是用来存储：

局部变量、操作栈、动态链表、方法出口这些东西；**这些东西有个特点：都是线程私有的，所以虚拟机栈是线程私有的**）

因为虚拟机栈是私有的，当线程调用某一个方法再到这个方法执行结束；其实就是对应着一个栈帧在虚拟机入栈到出栈的过程；

**对于虚拟机栈可能出现的异常有两种**：

1：如果线程请求的栈深度大于虚拟机栈允许的最大深度，报错：StackOverflowError

（这种错误经常出现在递归操作中，无限制的反复调用方法，最终导致压栈深度超过虚拟机允许的最大深度，就会报错）

2：java的虚拟机栈可以进行动态扩展，但随着扩展会不断的申请内存，当无法申请足够内存的时候就会报错：OutOfMemoryError

#### 4.1.4 本地方法栈

本地方法栈（Native Method Stacks）与虚拟机栈所发挥的作用是非常相似的，其区别不过是虚拟机栈为虚拟机执行Java方法（也就是字节码）服务，而本地方法栈则是**为虚拟机使用到的Native方法服务(比如C语言写的程序和C++写的程序)

#### 4.1.5 直接内存（了解）

直接内存（Direct Memory）并不是运行时数据区中的部分；但是这块儿往往会被大多数程序员忽略，不小心也会导致OOM的错误；

##### 4.1.5.1 原始的socket IO

这是因为在JDK1.4之前java操作数据过程中使用的IO操作是原始的socket IO

传统的IO，通过socket的方式发送给服务端，需要干些什么事情：

1、先把文件读到操作系统的缓存当中

2、再把操作系统的缓存中内容读到应用中

3、再从应用的缓存当中读到发送的socket缓存当中

4、在从socket缓存当中把数据发出去

总共做了4次的拷贝。

![1540350170166](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540350170166.png)

##### 4.1.5.2 NIO

NIO比较传统IO的话，系统中的buffer不再需要拷贝给应用了

而是read buffer 直接拷贝给socket buffer

我们的应用只需要在两个buffer之间建立一个管道的

这样省略了两次的copy。速度就快了很多

![1540350237575](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540350237575.png)

NIO可以直接使用Native（本地方法栈）函数库直接分配堆外内存，然后通过一个存储在Java堆中的DirectByteBuffer对象作为堆外内存的引用进行操作；

所以有时候程序员在分配内存时候经常会忽略掉直接内存。导致各个区域的内存总和大于物理内存限制，然后OOM。

### 4.2 JVM线程安全

![1540349766320](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540349766320.png)

## 4.3 JVM内存溢出

### 4.3.1 Java堆溢出

~~~java
/**
 * -Xms20m -Xmx20m
 * -XX:+PrintGCDetails
 */
public class PrintGC_demo {
    public static void main(String[] args) throws InterruptedException {
        List<OOM_demo> list = new ArrayList<OOM_demo>();
        while (true){
            list.add(new OOM_demo());
        }
    }
}

class OOM_demo{
    private static final int _1kb = 1024 ;
    byte[] data = new byte[_1kb];
}
~~~

~~~java
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
	at cn.itcast.jvm.heap.OOM_demo.<init>(PrintGC_demo.java:21)
	at cn.itcast.jvm.heap.PrintGC_demo.main(PrintGC_demo.java:14)
~~~



### 4.3.2 虚拟机栈和本地方法栈溢出

Java虚拟机规范中描述了两种异常：

1：如果线程请求的栈深度大于虚拟机允许的最大深度，则报错：StackOverFlowError

2：如果虚拟机在扩展时无法申请到足够的内存空间，则抛出OutOfMemoryError

#### 4.3.2.1 栈帧溢出

单个线程的栈帧溢出

~~~java
public class StackOverFlow {
    public static void main(String[] args) {
        new StackOverFlow().pushStack();
    }
    int index = 0;
    public void pushStack(){
        System.out.println("压栈第 :  "+index++);
        try {
            Thread.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        new Thread().getState();
        pushStack();
    }
}
~~~

~~~java
压栈第 :  1174
压栈第 :  1175
压栈第 :  1176
压栈第 :  1177
压栈第 :  1178
压栈第 :  1179
压栈第 :  1180
压栈第 :  1181Exception in thread "main" java.lang.StackOverflowError
	at sun.nio.cs.UTF_8.updatePositions(UTF_8.java:77)
	at sun.nio.cs.UTF_8.access$200(UTF_8.java:57)
	at sun.nio.cs.UTF_8$Encoder.encodeArrayLoop(UTF_8.java:636)
	at sun.nio.cs.UTF_8$Encoder.encodeLoop(UTF_8.java:691)
	at java.nio.charset.CharsetEncoder.encode(CharsetEncoder.java:579)
	at sun.nio.cs.StreamEncoder.implWrite(StreamEncoder.java:271)
	at sun.nio.cs.StreamEncoder.write(StreamEncoder.java:125)
	at java.io.OutputStreamWriter.write(OutputStreamWriter.java:207)
	at java.io.BufferedWriter.flushBuffer(BufferedWriter.java:129)
	at java.io.PrintStream.newLine(PrintStream.java:545)
	at java.io.PrintStream.println(PrintStream.java:807)
	at cn.itcast.jvm.oom.StackOverFlow.pushStack(StackOverFlow.java:14)
	at cn.itcast.jvm.oom.StackOverFlow.pushStack(StackOverFlow.java:20)
~~~

#### 4.3.2.2 栈溢出

创建很多线程，让虚拟机栈内存溢出。

~~~java
/**
 * -Xms40m -Xmx40m
 */
public class StackThread extends Thread {
    public static volatile int index = 0;
    public static void main(String[] args) {
        new StackThread().addThread();
    }
    public void dont_stop(){
        while (true){ }
    }
    public void addThread(){
        while (true){
            Thread thread = new Thread(new Runnable()
            {
                public void run()
                {
                    System.out.println(index++);
                    dont_stop();
                }
            });
            thread.start();
        }
    }
}
~~~

~~~java
Exception in thread "main" java.lang.OutOfMemoryError: unable to create new native thread
	at java.lang.Thread.start0(Native Method)
	at java.lang.Thread.start(Thread.java:717)
	at cn.itcast.jvm.oom.StackThread.addThread(StackThread.java:24)
	at cn.itcast.jvm.oom.StackThread.main(StackThread.java:9)
~~~

线程的创建由操作系统来调度（初始化、调度、销毁）。

### 4.3.3 方法区和运行时常量池溢出

在方法区中有个小块区域叫做“常量池”。

常量池在java用于保存在编译期已确定的，已编译的class文件中的一份数据。它包括了关于类，方法，接口等中的常量，也包括字符串常量，如String s = "java"这种申明方式；当然也可扩充，执行器产生的常量也会放入常量池，故认为常量池是JVM的一块特殊的内存空间。

#### 4.3.3.1 常量池测试

~~~java
 public static void main(String[] args) {
        String a = "123";
        String b = "123";
        // ==操作比较的是两个变量的值是否相等，对于引用型变量表示的是两个变量在堆中存储的地址是否相同，即栈中的内容是否相同。
        System.out.println(a == b);

        String aa = new String("123");
        String bb = new String("123");
        // ==操作比较的是两个变量的值是否相等，对于引用型变量表示的是两个变量在堆中存储的地址是否相同
        // 这里是两个对象，引用自然不一样，所以返回false
        System.out.println(aa == bb);

        String c = "c";
        String cc = new String("c");
        //==操作比较的是两个变量的值是否相等，对于引用型变量表示的是两个变量在堆中存储的地址是否相同
        System.out.println(c == cc);

        String d = "d";
        //当调用intern（）方法时，不管使用什么方式定义一个字符串，都会首先在常量池中查找是否有相应的字符串存在，
        //如果有，直接返回常量池中的引用，否则，在常量池中生成相应的字符串并返回引用
        String dd = new String("d").intern();
        System.out.println(d == dd);
    }
~~~

![1541305930026](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1541305930026.png)

![1541305943400](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1541305943400.png)

~~~
/**
 * -XX:PermSize=10M -XX:MaxPermSize=10M
 */
public class MethodOOM {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        int i=0;
        String abc = "abc";
        while (true){
            //jvm 方法区，方法区中有个常量池，String a = "a"
            list.add(String.valueOf(i).intern());
            list.add((abc+i+abc).intern());
            i = i+1;
        }
    }
}
~~~

* 在JDK7中使用以下命令

  ~~~
  -XX:PermSize=10M -XX:MaxPermSize=10M
  ~~~

* 在JDK8中使用以下命令

  ~~~
  -XX:MetaspaceSize=2m -XX:MaxMetaspaceSize=2m
  ~~~

  **注意**：在JDK1.8以后，正式移除了永久代！，取而代之的是【元空间】

  元空间的本质和永久代类似，都是对JVM规范中方法区的实现。不过元空间与永久代之间最大的区别在于：元空间并不在虚拟机中，而是使用本地内存[所以元空间Metaspace仍然在非堆中]。因此，默认情况下，元空间的大小仅受本地内存限制，但可以通过以下参数来指定元空间的大小：

  　　-XX:MetaspaceSize，初始空间大小，达到该值就会触发垃圾收集进行类型卸载，同时GC会对该值进行调整：如果释放了大量的空间，就适当降低该值；如果释放了很少的空间，那么在不超过MaxMetaspaceSize时，适当提高该值。 
  　　-XX:MaxMetaspaceSize，最大空间，默认是没有限制的。

  　　除了上面两个指定大小的选项以外，还有两个与 GC 相关的属性： 
  　　-XX:MinMetaspaceFreeRatio，在GC之后，最小的Metaspace剩余空间容量的百分比，减少为分配空间所导致的垃圾收集 
  　　-XX:MaxMetaspaceFreeRatio，在GC之后，最大的Metaspace剩余空间容量的百分比，减少为释放空间所导致的垃圾收集

  所以上面的VM Args的参数稍微修改：

  -XX:MetaspaceSize=2m -XX:MaxMetaspaceSize=2m

#### 4.3.3.2 内存溢出

~~~java
/**
 * -XX:PermSize=10M -XX:MaxPermSize=10M
 */
public class MethodOOM {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        int i=0;
        while (true){
            list.add(String.valueOf(i).intern());
        }
    }
}
~~~

![1540366523606](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540366523606.png)



### 4.3.4 直接内存溢出

当程序中使用NIO存储数据，存储的数据容量超过了本地方法栈允许的容量的时候，就会报错: java.lang.OutOfMemoryError: Direct buffer memory

~~~java
/**
 * -Xmx20m -XX:MaxDirectMemorySize=10m
 */
public class DirectMemOOM {
    private static final int _1m = 1024*1024;
    public static void main(String[] args) throws IllegalAccessException {
        ByteBuffer.allocateDirect(11*_1m);
    }
}
~~~

![1540352285659](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540352285659.png)

## 5、 JVM垃圾回收算法

垃圾回收，就是要将内存中不用的对象清理掉，腾出空间。



## 5.1 垃圾回收算法理论

### 5.1.1 复制算法

复制算法将可用的内存容量划分成大小相等的两块，每次只使用其中的一块；当这一块内存用完，就会将还存活的对象放在另一块区域上，然后再把已使用的内存空间一次清理掉，这样每次清理垃圾的时候都是对整个半区进行垃圾回收，内存分配的时候也不用考虑内存碎片的问题了，这样对于内存的回收就更加简单高效。

![1540372816097](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540372816097.png)

但是这种算法也有缺点：

* 1）需要提前预留一半的内存区域用来存放存活的对象（经过垃圾收集后还存活的对象），这样导致可用的对象区域减小一半，总体的GC更加频繁了

* 2）如果出现存活对象数量比较多的时候，需要复制较多的对象，成本上升，效率降低

* 3）如果99%的对象都是存活的（老年代），那么老年代是无法使用这种算法的。



### 5.1.2 标记-清除算法

标记-清除算法是最基础的垃圾回收算法；

算法的分为两个阶段：

1：标记阶段

2：清除阶段

首先标记所有需要回收的对象，在标记完成之后统一回收所有被标记的对象；

![1540372926729](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540372926729.png)

标记-清除算法有两个不足之处：

1：一个是效率问题，标记和清除两个过程的效率都不高

2：空间问题：标记清除后会产生大量不连续的内存碎片（空间碎片太多可能会导致后续的程序运行过程中需要分配较大的对象时，无法找到足够的连续内存，这样就导致不得不提前出发垃圾收集动作）;

### 5.1.3 标记-整理算法

标记-整理算法和标记-清除算法很相似，但是标记整理算法并不是直接对可回收对象进行清理，而是让所有存活的对象都像一端移动，然后直接清理掉端边界以外的内存；

![1540372983639](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540372983639.png)



### 5.1.4 JDK1.7 - 垃圾回收

![1540373494951](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540373494951.png)

#### 5.1.4.1 年轻代

年轻代是由Eden space和两个suvisor组成的，在初始阶段，新创建的对象会分配给Eden区(如果创建的对象非常大，那么对象会直接进去老年代)，两个Suvisor区是空的。

* Eden：存放新生成的对象
* Suvisor：“两个幸存区。用来存放每次垃圾回收后存活的对象”

随着对象往Eden区进行填充，Eden区满了的时候，就会触young GC------ Minor GC

在这阶段会使用垃圾回收的算法---**复制算法**（复制算法会将存活的对象复制到from suvisor区域，然后已经无用的对象被回收）

![1540373632804](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540373632804.png)

随着minorGC的不断进行，会反复重复上面的过程，只要经过复制过程，年龄就会加1；

当对象的年龄不断的增长，达到一个默认值“15”（ -XX:MaxTenuringThreshold）的时候，对象就会进入老年代了。（在发生minor GC的时候。JVM都会去检查每次晋升到老年代的对象大小是否已经大于老年代剩余的空间，如果大于那么就会出现FULL GC）。

#### 5.1.4.2 年老代

随着年轻代的GC重复操作，只要年龄达到了哪个触发点，就会把年轻代的对象复制到老年代里面；那么随着时间的推移，老年代的对象会越来越多，最终老年代的空间区域也会不够，就会出现老年的GC-------Major GC（标记清除或者标记-整理）

#### 5.1.4.3 持久代（方法区）

持久代=方法区

主要存放Class和Meta的信息，Class在被加载的时候被放入永久代。 它和存放对象的堆区域不同，GC(Garbage Collection)不会在主程序运行期对永久代进行清理，所以如果你的应用程序会加载很多Class的话,就很可能出现PermGen space错误。

**方法区物理上存在于堆里，而且是在堆的持久代里面；但在逻辑上，方法区和堆是独立的。**
一般说堆的持久代就是说方法区，因为一旦JVM把方法区（类信息，常量池，静态字段，方法）加载进内存以后，这些内存一般是不会被回收的了。

### 5.2.5 JDK1.8 +垃圾回收

JDK8 自带先进的使用G1回收器。

Oracle官方计划在JDK9中将*G1*变成*默认*的垃圾收集器

G1是将整个堆空间划分成大小想等的小块（每一块成为region），每一块的内存是连续的。和分代收集算法一样，G1中每个快也会充当Eden、Suvisor、Old三种角色，但是他们不是固定的，这样使得内存的使用更加灵活；

![1540374259289](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540374259289.png)

## 6、JVM垃圾回收器

## 6.1 Serial收集器

单线程收集器，“单线程”的意义不仅仅说明它只会使用一个CPU或一个收集线程去完成垃圾收集工作；

更重要的是它在垃圾收集的时候，必须暂停其他工作线程，直到垃圾收集完毕；-----Stop-the-world

![1540374522368](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540374522368.png)

Serial收集器也并不是只有缺点；Serial收集器由于简单并且高效；

对于单CPU环境来说，由于Serial收集器没有线程间的交互，专心做垃圾收集自然可以做获得最高的垃圾收集效率

使用方式：-XX:+UseSerialGC

## 6.2 ParNew 收集器

ParNew收集器是Serial收集器的多线程版本；

除了使用多线程收集以外，其余行为和Serial收集器是一样的（收集算法、stopTheWorld）

![1540374624282](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540374624282.png)

ParNew收集器在单CPU服务器上的垃圾收集效率绝对不会比Serial收集器高；

但是在多CPU服务器上，效果会明显比Serial好

使用方式：-XX:+UseParNewGC 

## 6.3 Parallel Scavenge收集器

Parallel Scavenge收集器是一个**新生代**的收集器，并且使用复制算法，而且是一个并行的多线程收集器

Parallel Scavenge收集器的关注的点和其他收集器是不一样的；

* 其他收集器是尽量缩短垃圾收集时用户线程的停顿时间，而Parallel Scavenge收集器的目标是达到一个可控制的吞吐量（Throughput）；

* 吞吐量=运行用户代码时间/(运行用户代码时间+垃圾收集时间)

  (虚拟机总共运行100分钟，垃圾收集时间为1分钟，那么吞吐量就是99%)

Parallel Scavenge收集器提供了两个参数用于精确控制吞吐量，

* 分别是控制:最大垃圾收集停顿时间-XX:MaxGCPauseMillis

* 吞吐量大小-XX:GCTimeRatio

* 与Parallel Scavenge收集器有关的还有一个参数：-XX:+UseAdaptiveSizePolicy(有了这个参数之后，就不要手工指定年轻代、Eden、Suvisor区的比例，晋升老年代的对象年龄等，因为**虚拟机会根据系统运行情况进行自适应调节**) 


使用方式：-XX:+UseParallelGC

## 6.4 Serial  Old收集器

Serial Old是Serial收集器的老年代版本，它同样是一个单线程收集器，使用“标记-整理”算法。这个收集器的主要意义也是被Client模式下的虚拟机使用。

![1540375056674](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540375056674.png)

使用方式：-XX:+UseSerialGC

## 6.5 Parallel Old收集器

Parallel Old是parallel Scavenge的多线程版本，使用的是标记-整理算法；

Parallel Old收集器的工作过程：

![1540375205440](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540375205440.png)

使用方式：  -XX:+UseParallelOldGC

## 6.6 CMS 收集器

CMS（concurrent mark sweep）是以获取最短垃圾收集停顿时间为目标的收集器；

目前很大一部分的java应用几种在互联网的B/S系统服务器上，这类应用尤其注重服务器的响应速度，希望系统停顿时间最短，给用户带来良好的体验；

CMS收集器使用的算法是标记-清除算法实现的；



整个过程分4个步骤：

1、 初始标记

2、 并发标记

3、 重新标记

4、 并发清除

**其中初始标记和重新标记都需要stopTheWorld**

![1540375339596](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540375339596.png)

* 初始标记仅仅只是标记一下GC Roots能直接关联到的对象，速度很快；

* 并发标记阶段就是进行GC Roots Tracing（根搜索算法）的过程；

* 重新标记阶段是为了修改并发标记期间因用户程序继续运行而导致产生变动的那一部分对象的标记记录，**这个阶段停顿的时长要稍微比初始标记停顿的时间稍微长一点，但是远比并发标记的时间小很多**；

* 整个过程耗时最长的是**并发标记和并发清除**，但是他们都是可以与用户线程一起工作的，所以CMS收集器是停顿时间最短的垃圾收集器



CMS垃圾收集器缺点：

1：CMS收集器对CPU资源特别的敏感；CMS在并发阶段，虽然不会导致用户线程停顿，但是会因为占用一部分线程而导致应用程序变慢，总吞吐量变低；

2：使用标记-清除算法，会产生内存碎片（配合-XX:+UseCMSCompactAtFullCollection使用）

使用方式：-XX:+UseConcMarkSweepGC

## 6.7 G1收集器

![1540375564616](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540375564616.png)



G1收集器是最新的垃圾收集器，能效最好的收集器；

考虑到之前的垃圾收集器的优缺点，希望能够有这样一款收集器能够做到：

* 可以像CMS收集器一样,GC操作与应用的线程一起并发执行。

* 紧凑的空闲内存区间且没有很长的GC停顿时间。

* 需要可预测的GC暂停耗时。

* 不想牺牲太多吞吐量性能。

* 启动后不需要请求更大的Java堆。



### 6.7.1 内存划分

G1是将整个堆空间划分成大小想等的小块（每一块成为region），每一块的内存是连续的。和分代收集算法一样，G1中每个快也会充当Eden、Suvisor、Old三种角色，但是他们不是固定的，这样使得内存的使用更加灵活；

原来分代存储每个代的空间都是固定的比例，现在很灵活，不需要固定下。

![1540375594708](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540375594708.png)

在G1中有个特殊的区域叫做**：Humongous区域**。如果一个对象的空间超过了分区容量的50%以上，G1就认为这是一个巨型对象；默认巨型对象是需要存储在老年代中的，但是如果这个巨型对象只是短期存在，那么会对垃圾收集器造成负面影响；为了解决这个问题，G1专门划分了一个区域（Humongous）用来存储大对象；

注意：如果一个H区装不下一个巨型对象，那么G1会寻找连续的H分区来存储。为了能找到连续的H区，有时候不得不启动Full GC。

注意：一个Region的大小可以通过参数-XX:G1HeapRegionSize设定，取值范围从1M到32M，且是2的指数。如果不设定，那么G1会根据Heap大小自动决定。

### 6.7.2  GC模式

**G1提供了两种GC模式，Young GC和Mixed GC，两种都是Stop The World(STW)的**

* G1中的young GC

  **Young GC主要是对Eden区进行GC**，它在Eden空间耗尽时会被触发。在这种情况下，Eden空间的数据移动到Survivor空间中，如果Survivor空间不够，Eden空间的部分数据会直接晋升到年老代空间。**Survivor区的数据移动到新的Survivor区中**，也有部分数据晋升到老年代空间中。最终Eden空间的数据为空，GC停止工作，应用线程继续执行。

  发生在年轻代的GC算法，一般对象（除了巨型对象）都是在eden region中分配内存，当所有eden region被耗尽无法申请内存时，就会触发一次young gc，这种触发机制和之前的young gc差不多，执行完一次young gc，活跃对象会被拷贝到survivor region或者晋升到old region中，空闲的region会被放入空闲列表中，等待下次被使用。

* G1中的Mixed GC

  当越来越多的对象晋升到老年代old region时，为了避免堆内存被耗尽，虚拟机会触发一个混合的垃圾收集器，即mixed gc，**该算法并不是一个old gc，除了回收整个young region，还会回收一部分的old region，这里需要注意：是一部分老年代**，而不是全部老年代。

### 6.7.3 Full GC

如果对象内存分配速度过快，mixed gc来不及回收，导致老年代被填满，就会触发一次full gc，G1的full gc算法就是单线程执行的serial old gc，会导致异常长时间的暂停时间，需要进行不断的调优，尽可能的避免full gc.

### 6.7.4 部分参数

| -XX:+UseG1GC                        | 使用 G1 (Garbage First) 垃圾收集器                           |
| ----------------------------------- | ------------------------------------------------------------ |
| XX:MaxGCPauseMillis=n               | 设置最大GC停顿时间(GC pause time)指标(target). 这是一个软性指标(soft goal), JVM 会尽量去达成这个目标. |
| XX:InitiatingHeapOccupancyPercent=n | 启动并发GC周期时的堆内存占用百分比. G1之类的垃圾收集器用它来触发并发GC周期,基于整个堆的使用率,而不只是某一代内存的使用比. 值为 0 则表示"一直执行GC循环". 默认值为 45. |
| -XX:NewRatio=n                      | 新生代与老生代(new/old generation)的大小比例(Ratio). 默认值为 2. |
| -XX:SurvivorRatio=n                 | eden/survivor 空间大小的比例(Ratio). 默认值为 8              |
| -XX:MaxTenuringThreshold=n          | 提升年老代的最大临界值(tenuring threshold). 默认值为 15.     |
| -XX:ParallelGCThreads=n             | 设置垃圾收集器在并行阶段使用的线程数                         |
| -XX:ConcGCThreads=n                 | 并发垃圾收集器使用的线程数量                                 |
| -XX:G1HeapRegionSize=n              | 使用G1时Java堆会被分为大小统一的的区(region)。此参数可以指定每个heap区的大小. 默认值将根据 heap size 算出最优解. 最小值为 1Mb, 最大值为 32Mb. |

### 6.7.5 持久代不见了

​	随着JDK8的到来，JVM不再有PermGen。但类的元数据信息（metadata）还在，只不过不再是存储在连续的堆空间上，而是移动到叫做“Metaspace”的本地内存（Native memory）中。

​	类的元数据信息转移到Metaspace的原因是PermGen很难调整。PermGen中类的元数据信息在每次FullGC的时候可能会被收集，但成绩很难令人满意。而且应该为PermGen分配多大的空间很难确定，因为PermSize的大小依赖于很多因素，比如JVM加载的class的总数，常量池的大小，方法的大小等。

​	此外，在HotSpot中的每个垃圾收集器需要专门的代码来处理存储在PermGen中的类的元数据信息。从PermGen分离类的元数据信息到Metaspace,由于Metaspace的分配具有和Java Heap相同的地址空间，因此Metaspace和Java Heap可以无缝的管理，而且简化了FullGC的过程，以至将来可以并行的对元数据信息进行垃圾收集，而没有GC暂停。

​	更多信息：https://blog.csdn.net/zhushuai1221/article/details/52122880

## 7、JVM常见参数

## 7.1 参数列表

* -Xms：JVM初始最小堆内存

* -Xmx：JVM允许最大堆内存

* -XX：PermSize  JVM初始非堆内存

* -XX：MaxPermSize  JVM允许最大的非堆内存

* -XX：+UseConcMarkSweepGC：年老代激活CMS收集器（标记算法），可以尽量减少fullGC

* -XX：+UseParNewGC ：设置年轻代为多线程并行收集

* -XX：+UseCMSCompactAtFullCollection：在FULL GC的时候，对年老代的压缩（CMS的时候，会导致内存碎片，使内存空间不连续，可能会影响性能，但是可以消除碎片）

* -XX：CMSInitiatingOccupancyFraction=85：当年老代空间被占用85%的时候触发CMS垃圾收集

## 7.2 CMS用法

目前主流互联网公司都会使用CMS

~~~java
java -Xms100m -Xmx100m -Xmn50m -XX:MetaspaceSize=20m -XX:MaxMetaspaceSize=20m -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:+UseCMSCompactAtFullCollection -XX:CMSInitiatingOccupancyFraction=85 -Xverify:none -XX:+DisableExplicitGC -XX:+CMSParallelRemarkEnabled -XX:+PrintHeapAtGC -XX:+PrintGCTimeStamps -Xloggc:/root/JVM/gc.log  -jar JVM-1.0-SNAPSHOT.jar
~~~

## 7.3 JVM调优工具

### 7.3.1 jstat 命令

#### 7.3.1.1 查看加载了多少个类

```shell
[root@node03 bin]# jps
2041 Bootstrap
2089 Jps
[root@node03 bin]# jstat -class 2041
Loaded  Bytes  Unloaded  Bytes     Time   
  2705  5361.7        0     0.0       2.28
```

- Loaded 加载多少个
- Bytes 大小
- Unloaded 没有加载多少个
- Bytes 大小
- Time 加载时间

7.3.1.2 查看编译的情况

```shell
[root@node03 bin]# jstat -compiler 2041
Compiled Failed Invalid   Time   FailedType FailedMethod
    1624      0       0     2.82          0            
```

- Compiled 编译的数量
- Failed 失败的数量
- Invalid 不可用的数量
- Time 时间
- FailedType 失败的类型
- FailedMethod 失败的方法



##### 7.3.1.3 查看垃圾回收的统计

```shell
[root@node03 bin]# jstat -gc 2041
 S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT   
2560.0 2560.0  0.0   2554.0 30720.0  10068.4   40960.0    12352.0   16256.0 15940.7 1920.0 1803.5      3    0.132   0      0.000    0.132
```

- S0C：第一个Survivor区的大小（KB）
- S1C：第二个Survivor区的大小（KB）
- S0U：第一个Survivor区的使用大小（KB）
- S1U：第二个Survivor区的使用大小（KB）
- EC：Eden区的大小（KB）
- EU：Eden区的使用大小（KB）
- OC：Old区大小（KB）
- OU：Old使用大小（KB）
- MC：方法区大小（KB）
- MU：方法区使用大小（KB）
- CCSC：压缩类空间大小（KB）
- CCSU：压缩类空间使用大小（KB）
- YGC：年轻代垃圾回收次数
- YGCT：年轻代垃圾回收消耗时间
- FGC：老年代垃圾回收次数
- FGCT：老年代垃圾回收消耗时间
- GCT：垃圾回收消耗总时间

```shell
# 每一秒一次，总共打印5次
[root@node03 bin]# jstat -gc 2041 1000 5
 S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT   
2560.0 2560.0  0.0   2554.0 30720.0  10683.4   40960.0    12352.0   16256.0 15940.7 1920.0 1803.5      3    0.132   0      0.000    0.132
2560.0 2560.0  0.0   2554.0 30720.0  10683.4   40960.0    12352.0   16256.0 15940.7 1920.0 1803.5      3    0.132   0      0.000    0.132
2560.0 2560.0  0.0   2554.0 30720.0  10683.4   40960.0    12352.0   16256.0 15940.7 1920.0 1803.5      3    0.132   0      0.000    0.132
2560.0 2560.0  0.0   2554.0 30720.0  10683.4   40960.0    12352.0   16256.0 15940.7 1920.0 1803.5      3    0.132   0      0.000    0.132
2560.0 2560.0  0.0   2554.0 30720.0  10683.4   40960.0    12352.0   16256.0 15940.7 1920.0 1803.5      3    0.132   0      0.000    0.132
```

### 7.3.2 jmap的使用以及内存溢出分析

前面通过jstat可以对jvm堆的内存进行统计分析，而jmap可以获取到更加详细的内容，如：内存使用情况的汇总、对内存溢出的定位与分析。

#### 7.3.2.1 查看内存使用情况

```shell
[root@node03 bin]# jmap -heap 2041
Attaching to process ID 2041, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 25.181-b13

using thread-local object allocation.
Parallel GC with 2 thread(s)

Heap Configuration: # heap内存的使用
   MinHeapFreeRatio         = 0
   MaxHeapFreeRatio         = 100
   MaxHeapSize              = 1002438656 (956.0MB)
   NewSize                  = 20971520 (20.0MB)
   MaxNewSize               = 333971456 (318.5MB)
   OldSize                  = 41943040 (40.0MB)
   NewRatio                 = 2
   SurvivorRatio            = 8
   MetaspaceSize            = 21807104 (20.796875MB)
   CompressedClassSpaceSize = 1073741824 (1024.0MB)
   MaxMetaspaceSize         = 17592186044415 MB
   G1HeapRegionSize         = 0 (0.0MB)

Heap Usage: 
PS Young Generation #年轻代
Eden Space:
   capacity = 31457280 (30.0MB)
   used     = 11569496 (11.033531188964844MB)
   free     = 19887784 (18.966468811035156MB)
   36.77843729654948% used
From Space: #S1
   capacity = 2621440 (2.5MB)
   used     = 2615344 (2.4941864013671875MB)
   free     = 6096 (0.0058135986328125MB)
   99.7674560546875% used
To Space: #S2
   capacity = 2621440 (2.5MB)
   used     = 0 (0.0MB)
   free     = 2621440 (2.5MB)
   0.0% used
PS Old Generation  #老年代
   capacity = 41943040 (40.0MB)
   used     = 12648416 (12.062469482421875MB)
   free     = 29294624 (27.937530517578125MB)
   30.156173706054688% used

11709 interned Strings occupying 1680048 bytes.
```

#### 7.3.2.2 查看内存中对象数量及大小

```shell
[root@node03 bin]# jmap -histo 2041 | more
# 排序     实例个数           大小      类的名称
 num     #instances         #bytes  class name
----------------------------------------------
   1:         73075        9226984  [C
   2:         20056        7482752  [B
   3:          6218        3317792  [I
   4:         44611        1070664  java.lang.String
   5:         27341         874912  java.util.HashMap$Node
   6:          5444         479072  java.lang.reflect.Method
   7:          7021         422736  [Ljava.lang.Object;
   8:          1652         386080  [Ljava.util.HashMap$Node;
   9:          2980         338400  java.lang.Class
  10:          7260         290400  java.util.TreeMap$Entry
  11:          4644         185760  java.util.HashMap$KeyIterator
  12:          3829         180936  [Ljava.lang.String;
  13:          8368         174736  [Ljava.lang.Class;
  14:          3597         143880  java.util.HashMap$ValueIterator
  15:          4483         143456  java.util.concurrent.ConcurrentHashMap$Node
  16:          4346         139072  java.io.File
  17:          2718         130464  java.util.HashMap
  18:          5131         123144  java.lang.StringBuilder
  19:          3165         101280  java.util.ArrayList$Itr
  20:          1666          93296  java.util.concurrent.ConcurrentHashMap$KeyI
--More--
```

对象类型

- B byte
- C char
- D double
- F float
- I int
- J long
- Z boolean
- [ 数组，如[I表示int[]
- [L+类名 其他对象

查看内存中对象活跃数量及大小

```shell
[root@node03 bin]# jmap -histo:live 2041 | more

 num     #instances         #bytes  class name
----------------------------------------------
   1:         30509        5788920  [C
   2:          3192        3888832  [B
   3:         29582         709968  java.lang.String
   4:         14854         475328  java.util.HashMap$Node
   5:          4514         397232  java.lang.reflect.Method
   6:          2972         337568  java.lang.Class
   7:          3684         219528  [Ljava.lang.Object;
   8:           956         171024  [Ljava.util.HashMap$Node;
   9:          4365         139680  java.util.concurrent.ConcurrentHashMap$Node
  10:          2189          87560  java.lang.ref.Finalizer
  11:          1652          80744  [I
  12:          1574          75552  java.util.HashMap
  13:           820          63496  [Ljava.lang.String;
  14:          3897          62352  java.lang.Object
  15:          1248          49920  java.util.LinkedHashMap$Entry
  16:          2450          49560  [Ljava.lang.Class;
  17:          1434          45888  java.util.Hashtable$Entry
  18:           775          43400  java.util.zip.ZipFile$ZipFileInputStream
  19:           744          41664  java.util.zip.ZipFile$ZipFileInflaterInputStream
```

#### 7.3.2.3 将内存使用情况dump到文件中

有些时候我们需要将jvm当前内存中的情况dump到文件中，然后对它进行分析，jmap也是支持dump到文件中

```shell
#用法：
jmap -dump:format=b,file=dumpFileName <pid>
#示例
jmap -dump:format=b,file=/tmp/dump.dat 6219
```

通过jhat对dump文件进行分析

```shell
#用法：
jhat -port <port> <file>

#例子：
[root@node03 ~]# jhat -port 9999 dump.dat 
Reading from dump.dat...
Dump file created Sat Nov 03 19:50:20 CST 2018
Snapshot read, resolving...
Resolving 157423 objects...
Chasing references, expect 31 dots...............................
Eliminating duplicate references...............................
Snapshot resolved.
Started HTTP server on port 9999
Server is ready.
```

![1541250113306](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1541250113306.png)





![1541250189550](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1541250189550.png)

![1541250328858](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1541250328858.png)

实际用法：

我们可以看看一个字符串的大小，并找到内容，并分析内容的组成。看看内容是否合理。



### 7.3.3 jstack的使用

#### 7.3.3.1用法

#用法：jstack

产看资料中的thread.log日志,能够看到当前虚拟机里面的状态信息。

#### 7.3.3.2 线程的状态

![1541251657984](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1541251657984.png)

在Java中线程的状态一共被分成6种：

- 初始态（NEW）
  创建一个Thread对象，但还未调用start()启动线程时，线程处于初始态。
  运行态（RUNNABLE），在Java中，运行态包括 就绪态 和 运行态。
- 就绪态
  该状态下的线程已经获得执行所需的所有资源，只要CPU分配执行权就能运行。
  所有就绪态的线程存放在就绪队列中。
- 运行态
  获得CPU执行权，正在执行的线程。
  由于一个CPU同一时刻只能执行一条线程，因此每个CPU每个时刻只有一条运行态的线程。
- 阻塞态（BLOCKED）
  当一条正在执行的线程请求某一资源失败时，就会进入阻塞态。
  而在Java中，阻塞态专指请求锁失败时进入的状态。
  由一个阻塞队列存放所有阻塞态的线程。
  处于阻塞态的线程会不断请求资源，一旦请求成功，就会进入就绪队列，等待执行。
- 等待态（WAITING）
  当前线程中调用wait、join、park函数时，当前线程就会进入等待态。
  也有一个等待队列存放所有等待态的线程。
  线程处于等待态表示它需要等待其他线程的指示才能继续运行。
  进入等待态的线程会释放CPU执行权，并释放资源（如：锁）
- 超时等待态（TIMED_WAITING）
  当运行中的线程调用sleep(time)、wait、join、parkNanos、parkUntil时，就会进入该状态；
  它和等待态一样，并不是因为请求不到资源，而是主动进入，并且进入后需要其他线程唤醒；
  进入该状态后释放CPU执行权 和 占有的资源。
  与等待态的区别：到了超时时间后自动进入阻塞队列，开始竞争锁。
- 终止态（TERMINATED）
  线程执行结束后的状态。



#### 7.3.3.3 死锁实战

```java
public class DeadLock {
    private static Object obj1 = new Object();
    private static Object obj2 = new Object();
    public static void main(String[] args) {
        new Thread(new Thread1()).start();
        new Thread(new Thread2()).start();
    }
    private static class Thread1 implements Runnable{
        public void run() {
            synchronized (obj1){
                System.out.println("Thread1 拿到了 obj1 的锁！");
                try {
// 停顿2秒的意义在于，让Thread2线程拿到obj2的锁
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (obj2){
                    System.out.println("Thread1 拿到了 obj2 的锁！");
                }
            }
        }
    }
    private static class Thread2 implements Runnable{
        public void run() {
            synchronized (obj2){
                System.out.println("Thread2 拿到了 obj2 的锁！");
                try {
// 停顿2秒的意义在于，让Thread1线程拿到obj1的锁
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (obj1){
                    System.out.println("Thread2 拿到了 obj1 的锁！");
                }
            }
        }
    }
}
```

```shell
Found one Java-level deadlock:
=============================
"Thread-1":
  waiting to lock monitor 0x00007efc880062c8 (object 0x00000000ec1dc5c8, a java.lang.Object),
  which is held by "Thread-0"
"Thread-0":
  waiting to lock monitor 0x00007efc88004e28 (object 0x00000000ec1dc5d8, a java.lang.Object),
  which is held by "Thread-1"

Java stack information for the threads listed above:
===================================================
"Thread-1":
        at DeadLock$Thread2.run(DeadLock.java:35)
        - waiting to lock <0x00000000ec1dc5c8> (a java.lang.Object)
        - locked <0x00000000ec1dc5d8> (a java.lang.Object)
        at java.lang.Thread.run(Thread.java:748)
"Thread-0":
        at DeadLock$Thread1.run(DeadLock.java:19)
        - waiting to lock <0x00000000ec1dc5d8> (a java.lang.Object)
        - locked <0x00000000ec1dc5c8> (a java.lang.Object)
        at java.lang.Thread.run(Thread.java:748)

Found 1 deadlock.
```

### 7.3.4 VisualVM工具的使用

VisualVM，能够监控线程，内存情况，查看方法的CPU时间和内存中的对 象，已被GC的对象，反向查看分配的堆
栈(如100个String对象分别由哪几个对象分配出来的)。
VisualVM使用简单，几乎0配置，功能还是比较丰富的，几乎囊括了其它JDK自带命令的所有功能。

- 内存信息
- 线程信息
- Dump堆（本地进程）
- Dump线程（本地进程）
- 打开堆Dump。堆Dump可以用jmap来生成。
- 打开线程Dump
- 生成应用快照（包含内存信息、线程信息等等）
- 性能分析。CPU分析（各个方法调用时间，检查哪些方法耗时多），内存分析（各类对象占用的内存，检查哪些类占用内存多）
- ……



#### 7.3.4.1 启动

![1541253261921](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1541253261921.png)

#### 7.3.4.2 本地监控

![1541253782668](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1541253782668.png)

#### 7.3.4.3 远程监控(了解)

VisualJVM不仅是可以监控本地jvm进程，还可以监控远程的jvm进程，需要借助于JMX技术实现。
JMX（Java Management Extensions，即Java管理扩展）是一个为应用程序、设备、系统等植入管理功能的框架。
JMX可以跨越一系列异构操作系统平台、系统体系结构和网络传输协议，灵活的开发无缝集成的系统、网络和服务管理应用。

```java
java -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.port=9999 DeadLock
```

这几个参数的意思是：

- -Dcom.sun.management.jmxremote ：允许使用JMX远程管理
- -Dcom.sun.management.jmxremote.port=9999 ：JMX远程连接端口
- -Dcom.sun.management.jmxremote.authenticate=false ：不进行身份认证，任何用户都可以连接
- -Dcom.sun.management.jmxremote.ssl=false ：不使用ssl

## 8、多线程

## 8.1 线程安全

线程安全，就是两个和多个线程对共享变量进行操作，造成最后数据的混乱。

通过Synchronized关键词，可以在任意对象及方法上加锁，加锁的这段代码称为“互斥区”或者临界区。

加锁之后就会出现了排他性，就是线程1在执行的时候，必须要采取一些措施，不能让线程1正在操作的代码的时候，其他线程也能介入。

![1541317487778](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1541317487778.png)

锁的类型

* 在修饰方法的时候，默认是当前对象作为锁的对象

* 在修饰类时，默认是当前类的Class对象作为所的对象

* 故存在着方法锁、对象锁、类锁这样的概念
  * 对象锁，以当前对象的实例为锁，包含方法锁
  * 类锁，以当前对象的class文件为锁，包含静态方法锁
  * 方法锁，方法锁（synchronized修饰方法时）

## 8.2 对象锁的两种方式

在修饰方法的时候，默认是当前对象作为锁的对象。

方式一：方法锁

~~~java
public class Printer {
    /**
     * 对方法进行加锁
     * @param str
     */
    public synchronized void print(String str){
        for(int i=0 ; i < str.length() ; i++){
            System.out.print(str.charAt(i));
        }
        System.out.println();
        System.out.println("当前执行的线程是：" + Thread.currentThread().getName());
    }
}
~~~
方式二：代码块

~~~java
public class Printer {
    
    public  void print(String str){
        synchronized(this){
            for(int i=0 ; i < str.length() ; i++){
                System.out.print(str.charAt(i));
            }
            System.out.println();
            System.out.println("当前执行的线程是：" + Thread.currentThread().getName());
        }
    }
}
~~~

同步方法锁的范围比较大，而同步代码块范围要小点，一般同步的范围越大，性能就越差，一般需要加锁进行同步的时候，肯定是范围越小越好，这样性能更好。

## 8.3 类锁的两种方式

由于一个class不论被实例化多少次，其中的静态方法和静态变量在内存中都只有一份。所以，一旦一个静态的方法被声明为synchronized。此类所有的实例对象在调用此方法，共用同一把锁，我们称之为类锁。

方式一：

~~~java
public static synchronized void print(String str) {
        for (int i = 0; i < str.length(); i++) {
            System.out.print(str.charAt(i));
        }
        System.out.println();
        System.out.println("当前执行的线程是：" + Thread.currentThread().getName());
    }
~~~

方式二：

~~~java
 public void print(String str) {
        synchronized (Printer.class) {
            for (int i = 0; i < str.length(); i++) {
                System.out.print(str.charAt(i));
            }
            System.out.println();
            System.out.println("当前执行的线程是：" + Thread.currentThread().getName());
        }
    }
~~~

## 8.4 其他对象锁

~~~java
String anyString = "a";

    public void print(String str) {
        synchronized (anyString) {
            for (int i = 0; i < str.length(); i++) {
                System.out.print(str.charAt(i));
            }
            System.out.println();
            System.out.println("当前执行的线程是：" + Thread.currentThread().getName());
        }
    }
~~~

## 8.5 脏读

在做多线程的时候，调用对象的同步方法和异步方法时候，一定要考虑好当前业务的整体性也就是原子性，不然会出现脏读的现象；这个在开发的时候经常会遇到；

（你以为你加锁，但是并没有走）

~~~java
public class DirtyRead {
    private String weibo_name = "刘德华" ;
    private String weibo_sex = "男" ;
    public synchronized void setValue(String weibo_name , String weibo_sex){
        this.weibo_name = weibo_name ;
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        this.weibo_sex = weibo_sex ;
        System.out.println("setValue---------weibo_name :" + weibo_name + "-- weibo_sex : "+weibo_sex);
    }
    public void getValue(){
        System.out.println("getValue---------weibo_name :" + weibo_name + "-- weibo_sex : "+weibo_sex);
    }
    public static void main(String[] args) throws InterruptedException {
        final DirtyRead dr = new DirtyRead();
        Thread t1 = new Thread(new Runnable() {
            public void run() {
                dr.setValue("高圆圆" , "女");
            }
        }) ;
        t1.start();
        Thread.sleep(1000);
        dr.getValue();
    }
}
~~~

## 8.6 Lock锁（了解）

### 8.6.1 lock和synchronized的区别

* synchronized是java内置的语言，是java的关键字

* synchronized不需要手动去释放锁，当synchronized方法或者synchronized代码块执行完毕。系统会自动释放对该锁的占用。

* 而lock必须手动的释放锁，如果没有主动的释放锁，则可能造成死锁的问题

### 8.6.2 Lock接口中方法的使用

Lock有五个锁，分别是加锁、释放锁，尝试拿锁，尝试拿锁并等待，尝试拿锁被中断。

![1540379694431](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540379694431.png)

* lock()方法是平常使用得最多的一个方法，就是用来获取锁。如果锁已被其他线程获取，则进行等待。

  由于在前面讲到如果采用Lock，必须主动去释放锁，并且在发生异常时，不会自动释放锁。因此一般来说，使用Lock必须在**try{}catch{}**块中进行，并且将释放锁的操作放在**finally**块中进行，以保证锁一定被被释放，防止死锁的发生。

* tryLock()方法是有返回值的，它表示用来**尝试获取锁**，如果获取成功，则返回true，如果获取失败（即锁已被其他线程获取），则返回false，也就说这个**方法无论如何都会立即返回**。在拿不到锁时不会一直在那等待。

* tryLock(long time, TimeUnit unit)方法和tryLock()方法是类似的，只不过区别在于这个方法在拿不到锁时会等待一定的时间，在时间期限之内如果还拿不到锁，就返回false。如果如果一开始拿到锁或者在等待期间内拿到了锁，则返回true。

* lockInterruptibly()方法比较特殊，当通过这个方法去获取锁时，如果线程正在等待获取锁，则这个线程能够响应中断，即中断线程的等待状态。也就使说，当两个线程同时通过lock.lockInterruptibly()想获取某个锁时，假若此时线程A获取到了锁，而线程B只有在等待，那么对线程B调用threadB.interrupt()方法能够中断线程B的等待过程。

  注意，当一个线程获取了锁之后，是不会被interrupt()方法中断的。因此当通过lockInterruptibly()方法获取某个锁时，如果不能获取到，只有进行等待的情况下，是可以响应中断的。

　　而用synchronized修饰的话，当一个线程处于等待某个锁的状态，是无法被中断的，只有一直等待下去。

* unLock()方法是用来释放锁的。

### 8.6.3 ReentrantLock

ReentrantLock**是唯一实现了Lock接口的类**，并且ReentrantLock提供了更多的方法，ReentrantLock，意思是“**可重入锁**”。他有两个构造器，构造出两个锁，**公平锁和非公平锁**。公平锁就是保障了多线程下各线程获取锁的顺序，先到的线程优先获取锁，而非公平锁则无法提供这个保障。一般生产环境使用非公平锁，**非公平效率更高一点**。

![1540379867360](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540379867360.png)

### 8.6.3 Lock线程间通信

在JDK1.5以后出现了Condition接口，用来做新一代的线程间通信。

* Conditon中的await()对应Object的wait()；

* Condition中的signal()对应Object的notify()；

* Condition中的signalAll()对应Object的notifyAll()。

注意：Condition的调用必须在lock和unlock的保护范围内使用

~~~java
package thread;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockTest {
    private Lock lock = new ReentrantLock();
    private Condition conditionA = lock.newCondition();
    private Condition conditoinB = lock.newCondition();
    private Condition conditionC = lock.newCondition();
    private String type = "A" ;

    public void printA(){
        lock.lock();
        try{
            while (type != "A"){
                try{
                    conditionA.await();//如果type不是A，那么就阻塞conditionA对象
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
            System.out.println(Thread.currentThread().getName() + " 当前正在打印：A");
            type = "B" ;
            conditoinB.signal();//type为B，唤醒conditoinB对象上的线程
        }finally {
            lock.unlock();
        }
    }

    public void printB(){
        lock.lock();
        try{
            while (type != "B"){
                try {
                    conditoinB.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println(Thread.currentThread().getName() + " 当前正在打印：B");
            type = "C";
            conditionC.signal();
        }finally {
            lock.unlock();
        }
    }

    public void printC(){
        lock.lock();
        try{
            while (type != "C"){
                try {
                    conditionC.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println(Thread.currentThread().getName() + " 当前正在打印：C");
            type = "A";
            conditionA.signal();
        }finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) {
        final ReentrantLockTest business = new ReentrantLockTest();
        //构建一个线程专门打印A
        Thread tA = new Thread(new Runnable() {
            public void run() {
                for(int i=0;i<10;i++){
                    business.printA();
                }
            }
        });
        //构建一个线程专门打印A
        Thread tB = new Thread(new Runnable() {
            public void run() {
                for(int i=0;i<10;i++){
                    business.printB();
                }
            }
        });
        //构建一个线程专门打印A
        Thread tC = new Thread(new Runnable() {
            public void run() {
                for(int i=0;i<10;i++){
                    business.printC();
                }
            }
        });
        tA.start();
        tB.start();
        tC.start();
    }
}
~~~



## 8.7 伪共享

在并发编程过程中，我们大部分的焦点都放在如何**控制共享变量的访问控制上**（代码层面），但是很少人会关注系统硬件及 JVM 底层相关的影响因素； 

### 8.7.1 CPU缓存

网页浏览器为了加快速度，会在本机存缓存以前浏览过的数据；cookie技术。

传统数据库或NoSQL数据库为了加速查询，常在内存设置一个缓存，减少对磁盘(慢)的IO。

随着CPU的频率不断提升，而内存的访问速度却没有质的突破，为了弥补访问内存的速度慢，充分发挥CPU的计算资源，提高CPU整体吞吐量，在CPU与内存之间引入了一级Cache。随着热点数据体积越来越大，一级Cache L1已经不满足发展的要求，引入了二级Cache L2，三级Cache L3。

### 8.7.2 各缓存及内存的访问速度

| **从CPU到**                               | **大约需要的CPU周期** | **大约需要的时间** |
| ----------------------------------------- | --------------------- | ------------------ |
| 主存                                      |                       | 约60-80ns          |
| QPI总线传输（between sockets，not drawn） |                       | 约20ns             |
| L3 cache                                  | 约40-45 cycles        | 约15ns             |
| L2 cache                                  | 约10 cycles           | 约3ns              |
| L1 cache                                  | 约3-4 cycles          | 约1ns              |
| 寄存器                                    | 1 cycle               | 1/4ns              |

![1540380629829](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540380629829.png)

### 8.7.3 缓存行

缓存系统中是以缓存行（cache line）为单位存储的，程序的高效与否，关键就在于这个缓存行；

一般一行缓存行有64字节。所以使用缓存时，并不是一个一个字节使用，而是一行缓存行、一行缓存行这样使用；换句话说，CPU存取缓存都是按照一行，为最小单位操作的。

这意味着，如果没有好好利用缓存行的话，程序可能会遇到性能的问题；

如果，我们CPU单次要操作的数据是在一行中，那么计算速度要比到多行数据中获取数据要快。

但往往事与愿违。在高并发编程中，因为缓存行的问题，我们不得不面对缓存行引起的伪共享问题。

### 8.7.4 伪共享

伪共享的非标准定义为：缓存系统中是以缓存行（cache line）为单位存储的，当多线程修改互相独立的变量时，如果这些变量共享同一个缓存行，就会无意中影响彼此的性能，这就是伪共享。

![1540381107065](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/java/1540381107065.png)

上图说明了伪共享的问题。在核心1上运行的线程想更新变量X，同时核心2上的线程想要更新变量Y。不幸的是，这两个变量在同一个缓存行中。每个线程都要去竞争缓存行的所有权来更新变量。如果核心1获得了所有权，缓存子系统将会使核心2中对应的缓存行失效。当核心2获得了所有权然后执行更新操作，核心1就要使自己对应的缓存行失效。这会来来回回的经过L3缓存，大大影响了性能。如果互相竞争的核心位于不同的插槽，就要额外横跨插槽连接，问题可能更加严重。

### 8.7.5 解决伪共享

在Java类中，最优化的设计是考虑清楚哪些变量是不变的，哪些是经常变化的，哪些变化是完全相互独立的，哪些属性一起变化。

~~~java
/**
 * 1.当value变量改变时，modifyTime肯定会改变
 * 2.createTime变量和key变量在创建后，就不会再变化
 * 3.flag也经常会变化，不过与modifyTime和value变量毫无关联
 */
public class A {
    long modifyTime;
    boolean flag;
    long createTime;
    char key;
    int value;
}

value+modifyTime 放在一个缓存行中
flag 一个缓存行
~~~

#### 8.7.5.1 解决方式一

通过填充变量，使不相关的变量分开

~~~java
public class A {
    long a1, a2, a3, a4, a5, a6, a7, a8;//防止与前一个对象产生伪共享
    int value;
    long modifyTime;
    long b1, b2, b3, b4, b5, b6, b7, b8;//防止不相关变量伪共享;
    boolean flag;
    long c1, c2, c3, c4, c5, c6, c7, c8;//
    long createTime;
    char key;
    long d1, d2, d3, d4, d5, d6, d7, d8;//防止与下一个对象产生伪共享
}
~~~

#### 8.7.5.2 解决方式二

在JDK1.8中，新增了一种注解@sun.misc.Contended，来使各个变量在Cache line中分隔开。注意，jvm需要添加参数-XX:-RestrictContended才能开启此功能 
用时，可以在类前或属性前加上此注释：

~~~java
// 类前加上代表整个类的每个变量都会在单独的cache line中
@sun.misc.Contended
@SuppressWarnings("restriction")
public class ContendedData {
    int value;
    long modifyTime;
    boolean flag;
    long createTime;
    char key;
}
~~~

或者

~~~java
@SuppressWarnings("restriction")
public class ContendedGroupData {
    @sun.misc.Contended("group1")
    int value;
    @sun.misc.Contended("group1")
    long modifyTime;
    @sun.misc.Contended("group2")
    boolean flag;
    @sun.misc.Contended("group3")
    long createTime;
    @sun.misc.Contended("group3")
    char key;
}
~~~







