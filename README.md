###所有返回值均为json文件，首先检查error状态

###登录
LOGON

发送: UserName+Passwd

返回:uid，key

###注册
REGISTER

发送: UserName+Passwd

返回:uid，key

###发现
DISCOVER

发送：Lower+Upper

返回：返回区间[Lower，Upper]的消息

###个人信息
USERINFO

发送：UserID+Key

返回：个人兴趣单，收藏单，关注人

###详单信息
LISTINFO

发送：ListID

###建单
CREATELIST

发送：User+Key+ListName

返回：ListID

###赞
LIKE

发送：User+Key+Type+ID+Num

返回：

###踩
DISLIKE

发送：User+Key+Type+ID

返回：
