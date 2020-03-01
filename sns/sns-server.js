// snsサーバー

// データベースに接続
const db = require('./server/database')

// webサーバーを起動
const express = require('express')
const app = express()
const portNo = 3001
app.listen(portNo, () => {
    console.log('起動しました', `http://localhost:${portNo}`)
})

// APIの定義
// ユーザー追加のAPI - ユーザーを追加する。
app.get('/api/adduser', (req, res) => {
    // リクエストからuseridとpasswdを取り出す
    const userid = req.query.userid
    const passwd = req.query.passwd
    // useridとpasswdのいずれかが設定されていない場合はエラー
    if (userid === '' || passwd == '') {
        return res.json({ status: false, msg: 'パラメータが空' })
    }

    // 既存ユーザーのチェック
    db.getUser(userid, (user) => {
        if (user) {
            return res.json({ status: false, msg: 'すでに登録されています。' })
        }

        db.addUser(userid, passwd, (token) => {
            if (!token) {
                res.json({ status: false, msg: 'DBエラー' })
            }
            res.json({ status: false, token })
        })
    })
})

// ユーザーログイン用のAPI
app.get('/api/login', (req, res) => {
    const userid = req.query.userid
    const passwd = req.query.passwd

    db.login(userid, passwd, (err, token) => {
        if (err) {
            res.json({ status: false, msg: '認証エラー' })
            return
        }
        res.json({ status: true, token })
    })
})

// 友達追加API
app.get('/api/add_friend', (req, res) => {
    const userid = req.query.userid
    const token = req.query.token
    const friendid = req.query.friendid

    db.checkToken(userid, token, (err, user) => {
        if (err) {
            res.json({ status: false, msg: '認証エラー' })
            return
        }
        // 友達追加
        user.friends[friendid] = true

        db.updateUser(user, (err) => {
            if (err) {
                res.json({ status: false, msg: 'DBエラー' })
                return
            }
        })
    })
})

// 自分のタイムラインに発言
app.get('/api/add_timeline', (req, res) => {
    const userid = req.query.userid
    const token = req.query.token
    const comment = req.query.token
    const time = (new Date()).getTime()
    db.checkToken(userid, token, (err, user) => {
        if (err) {
            res.json({ status: false, msg: '認証エラー' })
            return
        }
        // タイムラインに追加
        const item = {userid, comment, time}
        db.timelineDB.insert(item, (err, it) => {
            if (err){
                res.json({ status: false, msg: 'DBエラー' })
                return
            }
            res.json({status: true, timelineid: it._id})
        })
    })
})

// ユーザーの一覧を取得
app.get('/api/get_alluser', (req, res) =>{
    db.userDB.find({}, (err, docs) => {
        if (err) return res.json({status: false})
        const users = docs.map(e => e.userid)
        res.json({status: true, users})
    })
})

// 友達のタイムラインを取得
app.get('/api/get_friends_timeline', (req, res) => {
    const userid = req.query.userid
    const token = req.query.token
    db.getFrindsTimeline(userid, token, (err, docs) => {
        if (err){
            res.json({status: false, msg: err.toString()})
            return
        }
        res.json({status: true, timelines: docs})
    })
})

// 静的ファイルを自動的に返すようにルーティングする
app.use('/public', express.static('./public'))
app.use('/login', express.static('./public'))
app.use('/users', express.static('./public'))
app.use('/timeline', express.static('./public'))
app.use('/', express.static('./public'))