export const fetchDataFromLocalStorage = () => {
    const staticData = [
      {
        username: "vishal_patil",
        likes: 620,
        comments: 210,
        shares: 110,
        reach: 9500,
      },
      {
        username: "rohit_deshmukh",
        likes: 780,
        comments: 250,
        shares: 130,
        reach: 11000,
      },
      {
        username: "priya_kolte",
        likes: 750,
        comments: 180,
        shares: 90,
        reach: 9000,
      },
    ];
  
    const storedData = localStorage.getItem("apiResponse");
    return storedData ? JSON.parse(storedData) : staticData;
  };
  