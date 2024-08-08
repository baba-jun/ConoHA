import "../ServerList.css"
import { useState, useEffect } from 'react';

const ServerListTemp = {
  servers: [
    {
      name: "名称未設定",
      status: "稼働中",
      ip: "xxxxxxxx.sakura.ne.jp",
      spec: "仮想8Core 16GB メモリ SSD 800GB",
      tag: "Windows v5"
    },
    {
      name: "名称未設定",
      status: "停止中",
      ip: "xxxxxxxx.sakura.ne.jp",
      spec: "仮想8Core 16GB メモリ SSD 600GB",
      tag: "Windows v4"
    },
    {
      name: "名称未設定",
      status: "稼働中",
      ip: "xxxxxxxx.sakura.ne.jp",
      spec: "仮想6Core 8GB メモリ HDD 800GB",
      tag: "VPS v3"
    },
    {
      name: "名称未設定",
      status: "稼働中",
      ip: "xxxxxxxx.sakura.ne.jp",
      spec: "仮想6Core 8GB メモリ SSD 200GB",
      tag: "VPS v4"
    },
    {
      name: "名称未設定",
      status: "停止中",
      ip: "xxxxxxxx.sakura.ne.jp",
      spec: "仮想4Core 4GB メモリ SSD 200GB",
      tag: "Windows v5"
    },
    {
      name: "名称未設定",
      status: "稼働中",
      ip: "xxxxxxxx.sakura.ne.jp",
      spec: "仮想4Core 4GB メモリ HDD 400GB",
      tag: "VPS v4"
    },
    {
      name: "名称未設定",
      status: "稼働中",
      ip: "xxxxxxxx.sakura.ne.jp",
      spec: "仮想4Core 4GB メモリ HDD 400GB",
      tag: "VPS v4"
    }
  ]
}

const ServerList = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <div className="container">
      <h1>サーバー一覧 ({ServerListTemp.servers.length}台)</h1>
      <table>
        <thead>
          <tr>
            <th>状態</th>
            <th>名前</th>
            {!isMobile && (
              <>
                <th>IPアドレス</th>
                <th>スペック</th>
              </>
            )}
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {ServerListTemp.servers.map((server, index) => (
            <tr key={index}>
              <td>
                <div className="status">
                  <div className={server.status === "稼働中" ? "green" : "red"}></div>
                  {!isMobile && server.status}
                </div>
              </td>
              <td>{server.name}</td>
              {!isMobile && (
                <>
                  <td>{server.ip}</td>
                  <td>
                    {server.spec}&nbsp;
                    <span className={server.tag.includes("Windows") ? "tag windows" : "tag vps"}>
                      {server.tag}
                    </span>
                  </td>
                </>
              )}
              <td className="control">
                {server.status === "稼働中" ? (
                  <button className="button" onClick={() => handleStop(server.name)}>停止</button>
                ) : (
                  <button className="button" onClick={() => handleStart(server.name)}>再開</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const handleStop = (serverName : string) => {
  // サーバー停止のロジックをここに追加
  console.log(`サーバー ${serverName} を停止します`);
};

const handleStart = (serverName : string) => {
  // サーバー再開のロジックをここに追加
  console.log(`サーバー ${serverName} を再開します`);
};

export default ServerList