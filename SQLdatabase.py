import pymysql


def connetHD():
    # 打开数据库连接
    db = pymysql.connect(
    host='192.168.46.40',
    port=3306,
    user='root',
    passwd='youpassword',
    db='HD',
    charset='utf8mb4')
    ################################修改链接的密码与账号####################################

    # 数据库示例
    # 使用 cursor() 方法创建一个游标对象 cursor
    return db

def connetRank():
    # 打开数据库连接
    db = pymysql.connect(
    host='192.168.46.40',
    port=3306,
    user='root',
    passwd='youpassword',
    db='element_rank',
    charset='utf8mb4')
    ################################修改链接的密码与账号####################################

    # 数据库示例
    # 使用 cursor() 方法创建一个游标对象 cursor
    return db

def getVersion():
    db = connetHD()
    cursor = db.cursor()
    # 使用 execute()  方法执行 SQL 查询
    cursor.execute("SELECT VERSION()")
    # 使用 fetchone() 方法获取单条数据.
    data = cursor.fetchone()
    print("Database version : %s " % data)
    # 关闭数据库连接
    db.close()

def select(SQL='',choice = ""):
    try:
        dataBase = {"HD": "HD",
                    "rank": "rank"}
        if choice == dataBase["HD"]:
            db = connetHD()
        elif choice == dataBase["rank"]:
            db = connetRank()
        else:
            raise RuntimeError('testError')
        cursor = db.cursor()
        # SQL 查询语句

        if SQL == '':
            print('SQL语句为空')
            return None
        # 执行SQL语句
        cursor.execute(SQL)
        # 获取所有记录列表
        results = cursor.fetchall()
        db.close()
        return results
    except RuntimeError:
        print("123")
    except:
        print("Error: unable to fetch data")
        # 关闭数据库连接
        db.close()
