import pymysql

# 打开数据库连接
db = pymysql.connect("localhost", "testuser", "test123", "TESTDB")
################################修改链接的密码与账号####################################

#数据库示例
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()

def getVersion():
    # 使用 execute()  方法执行 SQL 查询
    cursor.execute("SELECT VERSION()")
    # 使用 fetchone() 方法获取单条数据.
    data = cursor.fetchone()
    print("Database version : %s " % data)
    # 关闭数据库连接
    db.close()


def insert(SQL=''):
    # SQL 插入语句
    sql = """INSERT INTO EMPLOYEE(FIRST_NAME,
             LAST_NAME, AGE, SEX, INCOME)
             VALUES ('Mac', 'Mohan', 20, 'M', 2000)"""
    if SQL == '':
        SQL =sql
        print('SQL语句为空')
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


def select(SQL = ''):
    # SQL 查询语句
    sql = "SELECT * FROM EMPLOYEE \
           WHERE INCOME > %s" % (1000)

    if SQL == '':
        SQL =sql
        print('SQL语句为空')
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            fname = row[0]
            lname = row[1]
            age = row[2]
            sex = row[3]
            income = row[4]
            # 打印结果
            print("fname=%s,lname=%s,age=%s,sex=%s,income=%s" % \
                  (fname, lname, age, sex, income))
            # 关闭数据库连接
            db.close()
            return results
    except:
        print("Error: unable to fetch data")
        # 关闭数据库连接
        db.close()




