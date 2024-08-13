import dynamic from "next/dynamic";
import Icon from "../Icon";
import Link from "next/link";
import NearWallet from "../blockchain/wallet/NearWallet";
import style from "./profile.module.css";

const Viewer = dynamic(() => import("@/components/Viewer"), { ssr: false });

export default function Avatar({ profile }) {
  return (
    <div className={style.card_profile_wallet}>
      <div className={style.card_profile}>
        <div className={style.profile}>
          <div className={style.profile_name}>
            <div className={style.profile_pic}>
              <Icon
                className="avatar"
                src={profile.avatar}
                alt="아바타"
                width={60}
                height={60}
              />
            </div>
            <p className={style.profile_nick}>
              안녕하세요, <span className="avatar-nick">{profile.nick}</span>님
            </p>
          </div>
        </div>
        <div className={style.profile_text_setting_button}>
          <div className={style.profile_text}>
            <Viewer content={profile.selfIntro.split("\n")[0]} />
            <div className={style.phone_number}>
              <div className={style.icon}>
                <Icon
                  className="tel"
                  src="/icon_tel.svg"
                  alt="tel"
                  width={18}
                  height={18}
                />
              </div>
              <p className={style.p1_16}>{profile.phnNmb}</p>
            </div>
          </div>
          <Link className={style.setting_button} href="/profile/edit">
            <Icon
              className={style.icon}
              src="/icon_cog_wheel.svg"
              alt="cog wheel"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
      <NearWallet />
    </div>
  );
}
