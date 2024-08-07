import { useState } from "react";
import "../Chat.css";

const Chat = () => {
  const questions = [
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
  ];

  const result = [
    "Ubuntu：24.04, 4GB, IPv4V6-Webがおすすめです",
    "Ubuntu：24.04, 2GB, IPv4V6-Webがおすすめです",
    "2GBプランがおすすめです",
    "4GBプランがおすすめです",
    "8GBプランがおすすめです",
    "16GBプランがおすすめです",
    "16GB（安定した運用には32GB）プランがおすすめです"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resultIndex, setResultIndex] = useState(0);
  const [iscontinue, setIscontinue] = useState(true);
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      text: "サーバーを借りるために、いくつか質問しますね。",
    },
  ]);
  const [ , setAnswers] = useState<string[]>([]);

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
        setResultIndex(0);
        setIscontinue(false);
        break;
      case "1つ":
        setResultIndex(1);
        setIscontinue(false);
        break;
      case "複数サイト":
        setResultIndex(0);
        setIscontinue(false);
        break;
      case "Minecraft java版":
        nextQuestionIndex = 5;
        break;
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
            <div className="result">{result[resultIndex]}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
