const Account = () => {
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
                dstudio818@gmail.com
              </h5>
              <span className="text-md text-zinc-500 dark:text-zinc-400">
                dstudio818@gmail.com
              </span>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between gap-2 ">
            <a
              className="text-brand-600 dark:text-brand-400 text-right font-medium hover:underline"
              href="/logout"
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
      </div>
    </div>
  );
};

export default Account;
