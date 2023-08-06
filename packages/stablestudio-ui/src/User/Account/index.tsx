import Cookies from "js-cookie";
import { logout } from "~/api/modules/user";
import { Router } from "~/Router";
import { Theme } from "~/Theme";

const Account = () => {
  const navigate = Router.useNavigate();
  const [userInfo, setUserInfo] = useState<any>();
  const [money, setMoney] = useState<string>();
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user") as string));
  }, []);

  const handleLogout = async () => {
    Cookies.remove("banruo.sig");
    Cookies.remove("banruo");
    const resp = await logout();
    if (resp) {
      navigate("/signin");
    }
  };

  const handleChangeMoney = (value: string) => {
    setMoney(value);
  };

  return (
    <div className="h-full justify-between overflow-y-auto bg-zinc-900 px-5 py-6">
      <div className="mx-auto flex max-w-[70rem] flex-col gap-8">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="text-3xl">Account</h1>
            <h2 className="opacity-75">
              Manage your account and billing information
            </h2>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="flex aspect-square h-full items-center justify-center rounded-full bg-gray-400 text-xl">
              <svg
                className="h-[75px] w-[75px]"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="PersonIcon"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-between gap-1 text-left">
              <h5 className="text-2xl font-medium text-zinc-900 dark:text-white">
                {userInfo?.email}
              </h5>
              <span className="text-md text-zinc-500 dark:text-zinc-400">
                {userInfo?.phone}
              </span>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between gap-2 ">
            <a
              className="text-brand-600 dark:text-brand-400 cursor-pointer text-right font-medium hover:underline"
              onClick={handleLogout}
            >
              Log out
            </a>
            <a
              className="text-brand-600 dark:text-brand-400 text-right font-medium hover:underline"
              href="/support"
            >
              Contact us
            </a>
            <a
              href="https://platform.stability.ai/docs/getting-started/credits-and-billing"
              className="text-brand-600 dark:text-brand-400 text-right font-medium hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Billing guide
            </a>
            <a
              className="text-brand-600 dark:text-brand-400 text-right font-medium hover:underline"
              href="/prompt-guide"
            >
              Prompt guide
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex h-fit flex-col rounded border border-zinc-700 bg-zinc-800 p-5">
            <div className="flex items-start">
              <h5 className="mb-3.5 text-xl font-semibold text-neutral-900 dark:text-white">
                魔力值
              </h5>
            </div>
            <div className="flex flex-row items-end justify-between">
              <span className="text-brand-400 text-3xl font-bold">867.3</span>
              <div className="opacity-muted flex text-xs tracking-wide">
                ~4,336 images
              </div>
            </div>
            <hr className="mb-4 mt-3 h-px border-0 bg-neutral-200 dark:bg-white/5"></hr>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <h1>购买魔力值</h1>
                <div className="flex flex-col gap-2">
                  <div className="css-1l8dqey col-span-2 flex items-center overflow-hidden rounded bg-neutral-50 text-neutral-900 duration-200 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400">
                    <div className="relative h-full w-full items-center rounded-r-none shadow-none">
                      <div className="pointer-events-none absolute bottom-0 left-0 top-0 flex items-center justify-center pl-3">
                        <span className="select-none text-neutral-900 dark:text-neutral-400">
                          $
                        </span>
                      </div>
                      <Theme.Input
                        className="dark:placeholder:text-muted-white h-full w-full rounded bg-transparent px-0 py-2 pl-9 text-base text-black shadow-sm focus:border-transparent focus:outline-none dark:border-none dark:bg-transparent dark:text-white"
                        value={money}
                        onChange={handleChangeMoney}
                      />
                    </div>
                    <button className="bg-brand-500 shadow-brand-500-md dark:bg-brand-600 dark:hover:bg-brand-500 border-brand-500 dark:border-brand-600 group relative flex h-fit w-fit cursor-pointer select-none flex-row items-center justify-center gap-0 whitespace-nowrap rounded rounded-l-none rounded-r-sm px-3 py-1.5 pr-4 align-middle text-sm font-light text-white opacity-100 shadow-md duration-100 dark:shadow-none">
                      <div className="-ml-1 mr-1 h-6 w-0 shrink origin-center p-0.5 opacity-75 duration-100 group-hover:opacity-100"></div>
                      Buy
                      <div className="absolute bottom-0 right-2 top-0 flex items-center justify-center"></div>
                    </button>
                  </div>
                  <div className="ml-auto flex flex-col items-end">
                    1,000&nbsp;credits
                    <div className="opacity-muted flex text-xs tracking-wide">
                      ~5,000 images
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-fit grow overflow-x-auto rounded border border-zinc-700 bg-zinc-800 p-5">
            <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
              <caption className="mb-4 text-left text-lg font-semibold text-neutral-900 dark:text-white">
                购买记录
              </caption>
              <thead className="border-b border-black/10 text-xs uppercase text-neutral-700 dark:border-white/5 dark:text-neutral-400">
                <tr>
                  <th scope="col" className=" py-2">
                    时间
                  </th>
                  <th scope="col" className="w-2/6 py-2">
                    魔力值
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="whitespace-nowrap pt-3">
                    06/18/23, 07:59:23 PM
                  </td>
                  <td className="pt-3">1,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
