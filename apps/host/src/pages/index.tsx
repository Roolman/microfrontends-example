import dynamic from "next/dynamic";

const UserData = dynamic(() => import('users/user-data'), { ssr: false });
const CardsSection = dynamic(() => import('cards/cards-section'), { ssr: false });
const AddPlacePopup = dynamic(() => import('cards/add-place-popup'), { ssr: false });
const ImagePopup = dynamic(() => import('cards/image-popup'), { ssr: false });
const EditProfilePopup = dynamic(() => import('users/edit-profile-popup'), { ssr: false });
const EditAvatarPopup = dynamic(() => import('users/edit-avatar-popup'), { ssr: false });

export default function Main() {

  return (
    <main className="content">
      <UserData />
      <CardsSection />
      <EditAvatarPopup />
      <EditProfilePopup />
      <AddPlacePopup />
      <ImagePopup />
    </main>
  );
}
