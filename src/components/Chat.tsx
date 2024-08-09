import { useState } from "react";
import { Link } from 'react-router-dom';
import "../Chat.css";
import { API_URL } from "../main";

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

  const result: { type: string; description: string; flavor: string | null; plan?: number }[] = [
    {type: "vps", description :"Ubuntu：24.04, 4GB, IPv4V6-Webがおすすめです", plan:3, flavor: "g2l-t-c4m4"},
    {type: "vps", description: "Ubuntu：24.04, 2GB, IPv4V6-Webがおすすめです", plan:2, flavor: "g2l-t-c3m2"},
    {type: "game", description: "2GBプランがおすすめです", flavor: null},
    {type: "game", description: "4GBプランがおすすめです", flavor: null},
    {type: "game", description: "8GBプランがおすすめです", flavor: null},
    {type: "game", description: "16GBプランがおすすめです", flavor: null},
    {type: "game", description: "16GB（安定した運用には32GB）プランがおすすめです", flavor: null},
  ];

  const termzlist: { term: number; description: string }[] = [
    {term: 1, description: "1ヶ月"},
    {term: 3, description: "3ヶ月"},
    {term: 6, description: "6ヶ月"},
    {term: 12, description: "12ヶ月"},
    {term: 24, description: "24ヶ月"},
    {term: 36, description: "36ヶ月"},
  ]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [resultIndex, setResultIndex] = useState<number>(0);
  const [iscontinue, setIscontinue] = useState<boolean>(true);
  const [chatHistory, setChatHistory] = useState<
    { type: "bot" | "user"; text: string }[]
  >([
    {
      type: "bot",
      text: "サーバーを借りるために、いくつか質問しますね。\n \r\nまずは、どの用途に使用したいですか？",
    },
  ]);
  const [, setAnswers] = useState<string[]>([]);
  const [isFinishedSetting, setIsFinishedSetting] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [term, setTerm] = useState<number>(0);
  const [fare, setFare] = useState<number>(0);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validatePassword = (password: string) => {
    const minLength = 9;
    const maxLength = 70;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[\^$+\-*/|()[\]{}.,?!_=&@~%#:;'"]/g.test(password);

    if (password.length < minLength || password.length > maxLength) {
      return "パスワードは9〜70文字で入力してください。";
    }
    if (!hasUpperCase) {
      return "パスワードには大文字を含めてください。";
    }
    if (!hasLowerCase) {
      return "パスワードには小文字を含めてください。";
    }
    if (!hasNumber) {
      return "パスワードには数字を含めてください。";
    }
    if (!hasSpecialChar) {
      return "パスワードには記号を含めてください。";
    }
    return "";
  };

  const handleOptionClick = (option: string) => {
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { type: "user", text: option },
    ]);


    setAnswers((prevAnswers) => [...prevAnswers, option]);

    let nextQuestionIndex = currentQuestionIndex + 1;

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
    fetchFare(term)
  };

  const handleSendInfo = async () => {
    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setIsSend(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/server/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flag: "1",
          password: password,
          server_name: "automatically-created-server",
          flavor_name: result[resultIndex].flavor,
        }),
      });

      if (!response.ok) {
        setIsError(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }else if(response.ok){
        setIsCreated(true);
      }

      const data = await response.json()
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fetchFare = async (term: number) => {
    try {
      const response = await fetch(`${API_URL}/api/price?type_id=${term}&plan_id=${result[resultIndex].plan}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.real_price != 0) {
        setFare(data.RealPrice);
      }else{
        setFare(data.OriginalPrice);
      }
    } catch (error) {
      console.error(`Failed to fetch price for type_id=${term}, plan_id=${result[resultIndex].plan}:`, error);
      return 'error';
    }
  }

  return (
    <div className="chat-container">
      {iscontinue &&
        chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="avatar"></div>
            <div className="message-bubble">{message.text}</div>
          </div>
        ))}

      {/* 現在の質問に対する選択肢を表示 */}
      {iscontinue && (
        <div className="message">
          <div className="avatar"></div>
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
          <div className="avatar"></div>
          <div className="message-bubble">
            <div className="result">{result[resultIndex].description}</div>
          </div>
        </div>
      )}

      {!iscontinue && (
        <div className="message">
          <div className="avatar"></div>
          <div className="message-bubble">
            どのくらいの期間使い続ける予定ですか？
            <div className="options-term">
              <div className="option-term" onClick={() => handleTermonClick(1)}>1ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(2)}>3ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(3)}>6ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(4)}>12ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(5)}>24ヶ月</div>
              <div className="option-term" onClick={() => handleTermonClick(6)}>36ヶ月</div>
            </div>
          </div>
        </div>
      )}

      {isFinishedSetting && (
        <div className="message user">
        <div className="message-bubble">
          {termzlist[term-1].description}
        </div>
        <div className="avatar">B</div>
      </div>
      )}

      {isFinishedSetting && (
        <div>
          {result[resultIndex].type === "vps" && (
          <div className="message">
            <div className="avatar"></div>
            <div className="message-bubble">
              料金は{fare}円/月です
            </div>
          </div>
          )}

          <div className="message">
          <div className="avatar"></div>
          <div className="message-bubble">
            rootパスワードを設定してください
            <br/>
            （アルファベット大文字、小文字、数字、記号をそれぞれ含めてください。）
            <div className="result"><input type="password" className="root-password-input" id="root-password" name="root-password" onChange={(e) => {setPassword(e.target.value)}}/></div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <button className="submit-button" onClick={handleSendInfo}>申し込む</button>
          </div>
        </div>
        {isSend && (
          <div className="message">
          <div className="avatar"></div>
          <div className="message-bubble">
            作成中…そのままでお待ちください
          </div>
          </div>
        )}
        {isCreated && (
          <div>
          <div className="message">
          <div className="avatar"></div>
          <div className="message-bubble">
            サーバーが作成されました
          </div>
          </div>
          <div className="message">
          <div className="avatar"></div>
          <div className="message-bubble">
          <Link
              to={"/server-list"}
              className={'active'}
            >
              サーバー一覧を確認する
            </Link>
            </div>
          </div>
          </div>
        )}
        {isError && (
          <div className="message">
          <div className="avatar"></div>
          <div className="message-bubble">
            サーバーの作成に失敗しました
          </div>
          </div>
        )}
        </div>
        )}
    </div>
  );
};

export default Chat;
