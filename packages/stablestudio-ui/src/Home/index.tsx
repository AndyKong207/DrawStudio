import { Router } from "~/Router";
import { Theme } from "~/Theme";
import { Logo } from "~/Theme/Logo";

const Home = () => {
  const navigate = Router.useNavigate();

  const handleToGenerate = () => {
    // navigate("/generate");
    window.location.href = "/draw-studio/generate";
  };

  const handleToGPT = () => {
    window.location.href = "https://124.222.198.28";
  };

  return (
    <div className="h-full w-full bg-slate-100 text-black">
      <div className="flex items-center space-x-2 px-12 py-4">
        <Logo />
        <span className="text-lg font-bold text-[#9013fe]">般若AI</span>
      </div>
      <div className="mx-auto flex max-w-[70rem] flex-col">
        <span className="mb-10 mt-10 text-center text-4xl font-bold text-[#9013fe]">
          选择您要使用的功能
        </span>
        <div className="flex flex-wrap justify-center space-x-8">
          <div className=" flex w-[400px] flex-col items-center rounded-lg bg-white p-8 shadow-md">
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
        <div className="my-6 flex justify-center space-x-8 text-4xl font-bold">
          <div>
            <span>已服务用户：</span>
            <span>1284513</span>
          </div>
          <div>
            <span>已处理文字：</span>
            <span>12313211231</span>
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
