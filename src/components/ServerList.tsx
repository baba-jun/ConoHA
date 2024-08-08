import "../ServerList.css";
import { useState, useEffect } from "react";
import { API_URL } from "../main";

type ServerData = {
  server_name: string;
  status: string;
  ip_address: string;
  spec: string;
  os_name: string;
};

const ServerList = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [serverList, setServerList] = useState<ServerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    console.log("Fetching server list...");
    fetch(`${API_URL}/api/server/list`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched:", data);
        setServerList(data.server_list);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching server list:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>サーバー一覧 ({serverList.length}台)</h1>
      <table>
        <thead>
          <tr>
            <th>状態</th>
            <th>名前</th>
            {!isMobile && (
              <>
                <th>IPアドレス</th>
                <th>OSタイプ</th>
              </>
            )}
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {serverList.map((server, index) => (
            <tr key={index}>
              <td>
                <div className="status">
                  <div className={server.status === "ACTIVE" ? "green" : "red"}></div>
                  {!isMobile && server.status}
                </div>
              </td>
              <td>{server.server_name}</td>
              {!isMobile && (
                <>
                  <td>{server.ip_address}</td>
                  <td>
                    {server.spec}&nbsp;
                    <span className={server.os_name?.includes("win") ? "tag windows" : "tag vps"}>
                      {server.os_name || "Unknown"}
                    </span>
                  </td>
                </>
              )}
              <td className="control">
                {server.status === "ACTIVE" ? (
                  <button className="button" onClick={() => handleStop(server.server_name)}>停止</button>
                ) : (
                  <button className="button" onClick={() => handleStart(server.server_name)}>再開</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const handleStop = (serverName: string) => {
  // サーバー停止のロジックをここに追加
  console.log(`サーバー ${serverName} を停止します`);
};

const handleStart = (serverName: string) => {
  // サーバー再開のロジックをここに追加
  console.log(`サーバー ${serverName} を再開します`);
};

export default ServerList;
