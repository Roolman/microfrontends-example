export interface CardItem {
  name: string;
  link: string;
  _id: string;
  owner: {
    _id: string;
  };
  likes: [
    {
      _id: string;
    }
  ];
}
