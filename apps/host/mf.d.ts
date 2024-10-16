declare module "activation/logout-button" {
  export = React.ComponentType<object>;
}

declare module "users/user-data" {
  export = React.ComponentType<object>;
}

declare module "cards/cards-section" {
  export = React.ComponentType<object>;
}

declare module "cards/add-place-popup" {
  export = React.ComponentType<object>;
}

declare module "cards/image-popup" {
  export = React.ComponentType<object>;
}

declare module "users/edit-profile-popup" {
  export = React.ComponentType<object>;
}

declare module "users/edit-avatar-popup" {
  export = React.ComponentType<object>;
}

declare module "activation/signin" {
  export function getServerSideProps(): void;
  export = React.ComponentType;
}

declare module "activation/signup" {
  export function getServerSideProps(): void;
  export = React.ComponentType;
}
