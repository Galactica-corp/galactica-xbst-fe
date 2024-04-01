import { ClientError } from "graphql-request";
import { useAccount } from "wagmi";

import { Footer } from "pages/home/ui/footer";
import { Header } from "pages/home/ui/header";

import { Step } from "./const";
import { useStatus } from "./hooks/useStatus";
import { Hero } from "./ui/hero/hero";

const useStep = () => {
  const { isDisconnected } = useAccount();

  const { data, query } = useStatus();
  const error = query.error;
  const status = data?.checkStatus;
  const followState = data?.verificationProgress.followState;
  const retweetState = data?.verificationProgress.retweetState;
  const txHash = data?.verificationProgress.transactionHash;

  const isUnauth =
    error instanceof ClientError &&
    error.response.errors?.[0].message === "unauthenticated";

  let step: Step = "x";

  if (isUnauth) {
    step = "x";
  }

  if (isDisconnected && !isUnauth) {
    step = "metamask";
  }

  if (status === "WALLET_NOT_BOUND" || status === "FOLLOW_NOT_CONFIRMED") {
    step = "followGalactica";
  }

  if (status === "FOLLOW_CONFIRMED") {
    step = "retweet";
  }

  if (status === "VERIFICATION") {
    step = "verifying";
  }

  if (status === "SBT_ISSUE_IN_PROGRESS" || status === "SBT_ISSUE_FAILED") {
    step = "issueSBT";
  }

  if (status === "SBT_ISSUE_COMPLETE") {
    step = "receiveSBT";
  }

  return {
    step,
    retweetState,
    followState,
    txHash,
  };
};

export const Home = () => {
  const { step, retweetState, followState, txHash } = useStep();

  return (
    <div className="relative flex min-h-full grow flex-col bg-main bg-cover bg-top bg-no-repeat px-28 pt-[18px]">
      <Header step={step} />
      <Hero
        className="mt-auto"
        followStatus={followState}
        retweetStatus={retweetState}
        step={step}
        txHash={txHash}
      />
      <Footer className="mb-16 mt-auto" step={step} />
    </div>
  );
};
