import pymysql


def connet():
    # 打开数据库连接
    db = pymysql.connect(
    host='192.168.46.40',
    port=3306,
    user='root',
    passwd='youpassword',
    db='HD',
    charset='utf8')
    ################################修改链接的密码与账号####################################

    # 数据库示例
    # 使用 cursor() 方法创建一个游标对象 cursor
    return db


def getVersion():
    db = connet()
    cursor = db.cursor()
    # 使用 execute()  方法执行 SQL 查询
    cursor.execute("SELECT VERSION()")
    # 使用 fetchone() 方法获取单条数据.
    data = cursor.fetchone()
    print("Database version : %s " % data)
    # 关闭数据库连接
    db.close()


def insert(SQL=''):
    db = connet()
    cursor = db.cursor()
    # SQL 插入语句

    if SQL == '':
        print('SQL语句为空')
        return None
    try:
        # 执行sql语句
        cursor.execute(SQL)
        # 提交到数据库执行
        db.commit()
        # 关闭数据库连接
        db.close()
    except:
        # 如果发生错误则回滚
        db.rollback()
        # 关闭数据库连接
        db.close()


def select(SQL=''):
    db = connet()
    cursor = db.cursor()
    # SQL 查询语句

    if SQL == '':
        print('SQL语句为空')
        return None
    try:
        # 执行SQL语句
        cursor.execute(SQL)
        # 获取所有记录列表
        results = cursor.fetchall()
        db.close()
        return results
    except:
        print("Error: unable to fetch data")
        # 关闭数据库连接
        db.close()
