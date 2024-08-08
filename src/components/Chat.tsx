import { useState } from "react";
import "../Chat.css";

interface Question {
  question: string;
  options: string[];
}

const Chat = () => {
  const questions: Question[] = [
    {
      question: "どの用途に使用したいですか？",
      options: ["Webサイトの公開", "ゲームサーバーのホスティング"],
    },
    {
      question: "何を使って構築していますか？",
      options: ["WordPress", "それ以外"],
    },
    {
      question: "なんのゲームですか？",
      options: [
        "Minecraft java版",
        "Minecraft 統合版",
        "ARK: Survival Evolved",
        "Palworld",
      ],
    },
    {
      question: "運営サイトはいくつですか？",
      options: ["1つ", "複数サイト"],
    },
    {
      question: "レンタル期間を選んでください",
      options: ["1か月", "3か月", "1年"],
    },
    {
      question: "何人程度でプレイしますか？",
      options: ["4人以下", "5人から10人", "11人以上"],
    },
    {
      question: "何人程度でプレイしますか？",
      options: ["最大プレーヤーが30人以下", "最大プレーヤーが70人以下"],
    },
    {
      question: "どのくらいの期間使い続ける予定ですか？",
      options: ["1ヶ月", "3ヶ月", "6ヶ月", "1年間", "2年間", "3年間"],
    },
  ];

  const result: { type: string; description: string; flavor: string | null }[] = [
      {type: "vps", description :"Ubuntu：24.04, 4GB, IPv4V6-Webがおすすめです", flavor: "g2l-t-c4m4"},
      {type: "vps", description: "Ubuntu：24.04, 2GB, IPv4V6-Webがおすすめです", flavor: "g2l-t-c3m2"},
      {type: "game", description: "2GBプランがおすすめです", flavor: null},
      {type: "game", description: "4GBプランがおすすめです", flavor: null},
      {type: "game", description: "8GBプランがおすすめです", flavor: null},
      {type: "game", description: "16GBプランがおすすめです", flavor: null},
      {type: "game", description: "16GB（安定した運用には32GB）プランがおすすめです", flavor: null},
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [resultIndex, setResultIndex] = useState<number>(0);
  const [iscontinue, setIscontinue] = useState<boolean>(true);
  const [chatHistory, setChatHistory] = useState<
    { type: "bot" | "user"; text: string }[]
  >([
    {
      type: "bot",
      text: "サーバーを借りるために、いくつか質問しますね。",
    },
  ]);
  const [, setAnswers] = useState<string[]>([]);
  const [isFinishedSetting, setIsFinishedSetting] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [term, setTerm] = useState<number>(0);

  const handleOptionClick = (option: string) => {
    // ユーザーの回答をチャット履歴に追加
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { type: "user", text: option },
    ]);


    // 選択された回答を保存
    setAnswers((prevAnswers) => [...prevAnswers, option]);

    let nextQuestionIndex = currentQuestionIndex + 1;

    // 次の質問を設定（条件に応じて分岐）
    switch (option) {
      case "Webサイトの公開":
      nextQuestionIndex = 1;
      break;
      case "ゲームサーバーのホスティング":
      nextQuestionIndex = 2;
      break;
      case "WordPress":
      nextQuestionIndex = 3;
      break;
      case "それ以外":
      case "1つ":
      case "複数サイト":
      setResultIndex(0);
      setIscontinue(false);
      break;
      case "Minecraft java版":
      case "Minecraft 統合版":
      nextQuestionIndex = 5;
      break;
      case "ARK: Survival Evolved":
      nextQuestionIndex = 6;
      break;
      case "4人以下":
      setResultIndex(2);
      setIscontinue(false);
      break;
      case "5人から10人":
      setResultIndex(3);
      setIscontinue(false);
      break;
      case "11人以上":
      setResultIndex(4);
      setIscontinue(false);
      break;
      case "最大プレーヤーが30人以下":
      setResultIndex(4);
      setIscontinue(false);
      break;
      case "最大プレーヤーが70人以下":
      setResultIndex(5);
      setIscontinue(false);
      break;
      case "Palworld":
      setResultIndex(6);
      setIscontinue(false);
      break;
      default:
      break;
    }

    // 次の質問をチャット履歴に追加
    if (iscontinue && nextQuestionIndex < questions.length) {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { type: "bot", text: questions[nextQuestionIndex].question },
      ]);
    }

    setCurrentQuestionIndex(nextQuestionIndex);
  };

  const handleTermonClick = async (term:number) => {
    setIsFinishedSetting(true);
    setTerm(term);
  };

  const handleSendInfo = async () => {
    const passwordInput = document.getElementById("root-password") as HTMLInputElement;
    setPassword(passwordInput?.value);

    try {
      const response = await fetch("http://localhost:8080/api/server/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://127.0.0.1:8080",
        },
        body: JSON.stringify({
          flag: "1",
          password: password,
          server_name: "test_server",
          flavor_name: result[resultIndex].flavor,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="chat-container">
      {iscontinue &&
        chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="avatar">{message.type === "bot" ? "A" : "B"}</div>
            <div className="message-bubble">{message.text}</div>
          </div>
        ))}

      {/* 現在の質問に対する選択肢を表示 */}
      {iscontinue && (
        <div className="message">
          <div className="avatar">A</div>
          <div className="message-bubble">
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div
                  className="option"
                  key={index}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {!iscontinue && (
        <div className="message">
          <div className="avatar">A</div>
          <div className="message-bubble">
            <div className="result">{result[resultIndex].description}</div>
          </div>
        </div>
      )}

      {!iscontinue && (
        <div className="message">
          <div className="avatar">A</div>
          <div className="message-bubble">
            どのくらいの期間使い続ける予定ですか？
            <div className="options-term">
              <div className="option-term" onClick={() => handleTermonClick(1)}>1ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(3)}>3ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(6)}>6ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(12)}>12ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(24)}>24ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(36)}>36ヶ月</div>
            </div>
          </div>
        </div>
      )}

      {isFinishedSetting && (
        <div className="message user">
        <div className="message-bubble">
          {term}ヶ月
        </div>
        <div className="avatar">B</div>
      </div>
      )}

      {isFinishedSetting && (
          <div className="message">
          <div className="avatar">A</div>
          <div className="message-bubble">
            <div className="result"><input type="password" className="root-password-input" id="root-password" name="root-password" /></div>
            <button className="submit-button" onClick={handleSendInfo}>送信</button>
          </div>
        </div>
        )}
    </div>
  );
};

export default Chat;
