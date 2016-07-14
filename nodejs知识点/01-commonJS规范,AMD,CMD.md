#### 1. 为什么要有CommonJS规范?

长久以来,javascript一直具有如下缺陷:
1. 没有模块系统
2. 标准库较少
3. 没有标准接口:web服务器或数据库交互
4. 缺乏包管理系统

`CommonJS规范的提出,主要是为了弥补当前js没有规范的缺陷,已达到像其他编程语言那样开发大型应用的能力`

`
现在,commonjs规范已经涵盖了模块、二进制、Buffer、字符集编码、IO流、进程、
文件系统、套接字、web服务器网关接口、包管理等。
`

#### 2. CommonJS模块规范

平时说的commonjs规范,大多是指模块规范。

模块加载顺序(按后缀: .js > .node > .json):
1. 核心模块
2. 路径形式的文件模块
3. 自定义模块(文件夹(包)的形式)
    - 查看文件目录下的node_modules目录
    - 父目录下的node_modules目录
    - 一直往上,直至根目录
    
`第二次引用时首先看缓存,然后按上述顺序再加载`

#### 3. 模块定义时,没有定义require,module,exports变量,为何能直接使用?
        node在编译模块的时候,会自动对js文件用一个函数进行包装,函数中传递了这几个参数!
        (function(exports,require,module,__filename,__dirname){
            //模块定义代码
        })
        

#### 4. CommonJS和AMD、CMD有什么区别?

