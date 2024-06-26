import fetchWithRetry from "@/functions/api";
import EditCommunityForm from "./EditCommunityForm";
import BackButton from "@/components/BackButton";

export async function generateMetadata({ params: { communityId } }) {
  const content = await getContent(communityId);

  return {
    title: content.title,
    description: content.description,
  };
}

async function getContent(contentId) {
  const getContentResponse = await fetchWithRetry(`/content/${contentId}`);

  if (!getContentResponse.ok)
    throw new Error("콘텐츠를 조회하는 중 에러가 발생했습니다.");

  return await getContentResponse.json();
}

async function EditContent({ communityId }) {
  const content = await getContent(communityId);

  return <EditCommunityForm content={content} />;
}

export default async function EditContentPage({ params: { communityId } }) {
  return (
    <>
      <header className="nb">
        <BackButton />
      </header>
      <article className="wrapper">
        <div className="frame-93">
          <div className="frame-57">
            <h3 className="h3-24 color-black">콘텐츠 수정</h3>
          </div>
          <div className="frame-34-4 background-white">
            <div className="frame-117">
              <EditContent communityId={communityId} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
