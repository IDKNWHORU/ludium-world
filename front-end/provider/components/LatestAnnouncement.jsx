import Link from "next/link";
import Icon from "./Icon";
import fetchWithRetry from "@/functions/api";

async function getLatestAnnouncement() {
  const getLatestAnnouncementResponse = await fetchWithRetry(
    "/content/latest-announcement"
  );

  if (!getLatestAnnouncementResponse.ok)
    if (getLatestAnnouncementResponse.status === 404) return null;
    else throw new Error("최신 공지사항을 조회하는 중 에러가 발생했습니다.");

  return await getLatestAnnouncementResponse.json();
}

export default async function LatestAnnouncement() {
  const latestAnnouncement = await getLatestAnnouncement();

  return (
    <header className="lastest-announcement-wrapper">
      <Link
        className="lastest-announcement"
        href={
          latestAnnouncement == null
            ? "#"
            : `/community/${latestAnnouncement.contentId}`
        }
      >
        <Icon src="/icon_announce.svg" alt="announce" width={24} height={24} />
        <p className="h4-20 lastest-announcement-text">
          {latestAnnouncement == null
            ? "최신 공지 데이터가 없습니다."
            : latestAnnouncement.title}
        </p>
        <p className="lastest-announcement-icon">N</p>
      </Link>
    </header>
  );
}
