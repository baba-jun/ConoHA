import "../ServerList.css"

const ServerList = () => {
    return (
        <div className="container">
        <h1>サーバー一覧 (15台)</h1>
        <table>
            <thead>
                <tr>
                    <th>名前</th>
                    <th>状態</th>
                    <th>IPアドレス</th>
                    <th>スペック</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>名称未設定</td>
                    <td>
                        <div className="status"><div className="green"></div>稼働中</div>
                    </td>
                    <td>xxxxxxxx.sakura.ne.jp</td>
                    <td>仮想8Core 16GB メモリ SSD 800GB <span className="tag windows">Windows v5</span></td>
                </tr>
                <tr>
                    <td>名称未設定</td>
                    <td>
                        <div className="status"><div className="red"></div>停止中</div>
                    </td>
                    <td>xxxxxxxx.sakura.ne.jp</td>
                    <td>仮想8Core 16GB メモリ SSD 600GB <span className="tag windows">Windows v4</span></td>
                </tr>
                <tr>
                    <td>名称未設定</td>
                    <td>
                        <div className="status"><div className="green"></div>稼働中</div>
                    </td>
                    <td>xxxxxxxx.sakura.ne.jp</td>
                    <td>仮想6Core 8GB メモリ HDD 800GB <span className="tag vps">VPS v3</span></td>
                </tr>
                <tr>
                    <td>名称未設定</td>
                    <td>
                        <div className="status"><div className="green"></div>稼働中</div>
                    </td>
                    <td>xxxxxxxx.sakura.ne.jp</td>
                    <td>仮想6Core 8GB メモリ SSD 200GB <span className="tag vps">VPS v4</span></td>
                </tr>
                <tr>
                    <td>名称未設定</td>
                    <td>
                        <div className="status"><div className="red"></div>停止中</div>
                    </td>
                    <td>xxxxxxxx.sakura.ne.jp</td>
                    <td>仮想4Core 4GB メモリ SSD 200GB <span className="tag windows">Windows v5</span></td>
                </tr>
                <tr>
                    <td>名称未設定</td>
                    <td>
                        <div className="status"><div className="green"></div>稼働中</div>
                    </td>
                    <td>xxxxxxxx.sakura.ne.jp</td>
                    <td>仮想4Core 4GB メモリ HDD 400GB <span className="tag vps">VPS v4</span></td>
                </tr>
                <tr>
                    <td>名称未設定</td>
                    <td>
                        <div className="status"><div className="green"></div>稼働中</div>
                    </td>
                    <td>xxxxxxxx.sakura.ne.jp</td>
                    <td>仮想4Core 4GB メモリ HDD 400GB <span className="tag vps">VPS v4</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

export default ServerList
