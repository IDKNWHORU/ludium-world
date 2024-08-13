"use client";

import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./wallet.module.css";
import Icon from "@/components/Icon";

export default function NearWallet() {
  const router = useRouter();

  const [selector, setSelector] = useState(null);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    setupWalletSelector({
      network: process.env.NEXT_PUBLIC_NEAR_NETWORK,
      modules: [setupMyNearWallet()],
    }).then((res) => {
      setSelector(res);
    });
  }, []);

  useEffect(() => {
    if (selector && selector.isSignedIn()) {
      selector.wallet().then((wallet) => {
        wallet.getAccounts().then((accounts) => {
          setAccountId(accounts[0].accountId);
        });
      });
    }
  }, [selector]);

  const signIn = async () => {
    const modal = setupModal(selector, {
      contranctId: process.env.NEXT_PUBLIC_NEAR_CONTRACT,
    });

    modal.show();
  };

  const signOut = async () => {
    const wallet = await selector.wallet();

    wallet.signOut();
    router.refresh();
  };

  return (
    <>
      {selector == null ? null : !selector.isSignedIn() ? (
        <div className={style.card_mywallet}>
          <div className={style.mywallet}>
            <div className={style.mywallet_text}>
              <h4 className={style.h4_18}>나의 지갑</h4>
            </div>
            <div className={style.wallet_logo_mywallet_information}>
              <div className={style.wallet_logo}>
                <Icon
                  className={style.wallet_logo_white}
                  src="/Wallet-logo-white.png"
                  width={61}
                  height={71}
                  alt="MyNearWallet Logo"
                />
              </div>
              <div className={style.mywallet_information}>
                <div className={style.mywallet_information_text}>
                  <h5 className={style.h5_16}>My Near Wallet</h5>
                  <p1 className={style.p1_16}>Connect required</p1>
                </div>
                <div className={style.button_s}>
                  <h5>확인하기</h5>
                </div>
              </div>
            </div>
          </div>
          <div className={style.rectangle_19}></div>
          <div className={style.mywallet_disabled_cover}>
            <div className={style.mywallet_text}>
              <h4 className={style.h4_18}>나의 지갑</h4>
            </div>
            <div className={style.mywallet_button} onClick={signIn}>
              <div className={style.button_right_icon}>
                <h5>지갑 연결하기</h5>
                <div className={style.icon}>
                  <Icon
                    src="/icon_wallet_white.png"
                    width={24}
                    height={24}
                    alt="지갑 연결하기"
                  ></Icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.card_mywallet}>
          <div className={style.mywallet}>
            <div className={style.mywallet_text}>
              <h4 className={style.h4_18}>나의 지갑</h4>
            </div>
            <div className={style.wallet_logo_mywallet_information}>
              <div className={style.wallet_logo}>
                <Icon
                  className={style.wallet_logo_white}
                  src="/Wallet-logo-white.png"
                  width={61}
                  height={71}
                  alt="MyNearWallet Logo"
                />
              </div>
              <div className={style.mywallet_information}>
                <div className={style.mywallet_information_text}>
                  <h5 className={style.h5_16}>My Near Wallet</h5>
                  <p1 className={style.p1_16}>{accountId}</p1>
                </div>
                <button className={style.button_s} onClick={signOut}>
                  <h5>연결해제</h5>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
