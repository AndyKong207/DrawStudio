import CountUp from "react-countup";
import { getSum } from "~/api/modules/user";
import { Theme } from "~/Theme";
import { Logo } from "~/Theme/Logo";

const Home = () => {
  const [isFirstReq, setIsFirstReq] = useState(true); // 是否是第一次请求
  const [sumData, setSumData] = useState<{ users: number; chats: number }>({
    users: 0,
    chats: 0,
  });

  const [newSumData, setNewSumData] = useState<{
    users: number;
    chats: number;
  }>({
    users: 0,
    chats: 0,
  });

  const timerRef = useRef<any>();

  useEffect(() => {
    fetchData();
    timerRef.current = setInterval(() => {
      fetchData(false);
    }, 5000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const fetchData = async (isFirst = true) => {
    setIsFirstReq(isFirst);
    const resp = await getSum();
    isFirst ? setSumData(resp as any) : setNewSumData(resp as any);
  };

  const handleToGenerate = () => {
    // navigate("/generate");
    window.location.href = "/draw-studio/generate";
  };

  const handleToGPT = () => {
    window.location.href = "https://124.222.198.28";
  };

  return (
    <div className="h-screen w-full overflow-y-auto bg-slate-100 text-black">
      <div className="flex items-center space-x-2 px-12 py-4">
        <Logo />
        <span className="text-lg font-bold text-[#9013fe]">般若AI</span>
      </div>
      <div className="mx-auto flex max-w-[70rem] flex-col">
        <span className="mb-10 mt-10 text-center text-4xl font-bold text-[#9013fe]">
          选择您要使用的功能
        </span>
        <div className="flex flex-wrap justify-around">
          <div className=" mb-4 flex w-[400px] flex-col items-center rounded-lg bg-white p-8 shadow-md">
            <div className="mb-4 text-xl font-bold">AI绘画</div>
            <ul className=" mb-4 list-disc space-y-3">
              <li>强大的AI绘画功能</li>
            </ul>
            <Theme.Button
              color="brand"
              size="lg"
              className="text-white"
              onClick={handleToGenerate}
            >
              免费使用
            </Theme.Button>
          </div>
          <div className=" flex w-[400px] flex-col items-center rounded-lg bg-white p-8 shadow-md">
            <div className="mb-4 text-xl font-bold">语言AI大模型</div>
            <ul className=" mb-4 list-disc space-y-3">
              <li>支持世界上几乎所有语言的相互翻译</li>
              <li>修正语法，润色文字；概括论文，总结主题</li>
              <li>支持富文本格式，绘制图表（流程图/思维导图等）</li>
              <li>撰写邮件/文案/合同；编写/解释/重构代码</li>
            </ul>
            <Theme.Button
              color="brand"
              size="lg"
              className="text-white"
              onClick={handleToGPT}
            >
              免费使用
            </Theme.Button>
          </div>
        </div>
        <div className="my-6 flex flex-wrap justify-around text-3xl font-bold">
          <div className="flex min-w-[400px] shrink-0 flex-nowrap items-baseline justify-center space-x-2">
            <span className="text-2xl font-normal text-gray-500">
              已服务用户
            </span>
            {isFirstReq ? (
              <CountUp start={0} end={sumData?.users} />
            ) : (
              <CountUp start={sumData?.users} end={newSumData?.users} />
            )}
          </div>
          <div className="flex min-w-[400px] shrink-0 flex-nowrap items-baseline justify-center space-x-2">
            <span className="text-2xl font-normal text-gray-500">
              已处理文字
            </span>
            {isFirstReq ? (
              <CountUp start={0} end={sumData?.chats} />
            ) : (
              <CountUp start={sumData?.chats} end={newSumData?.chats} />
            )}
          </div>
        </div>
      </div>
      <div>
        <img
          className="w-full"
          src="https://draw-1304100014.cos.ap-shanghai.myqcloud.com/banruoai%E4%B8%BB%E9%A1%B5.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
