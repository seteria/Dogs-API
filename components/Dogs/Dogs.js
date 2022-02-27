import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Image } from "@chakra-ui/react";
import axios from "axios";

const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickedIndex, setClickedIndex] = useState({});

  useEffect(() => {
    fetchDogs();
  }, []);

  const baseURL =
    "https://api.thedogapi.com/v1/images/search?limit=25&size=full";
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "91181943-5a3a-4929-937c-7cb7b9fa32f9",
    },
  };

  const fetchDogs = () => {
    setLoading(true);
    axios
      .get(baseURL, config)
      .then((res) => {
        console.log(res.data);
        setDogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClick = (index) => () => {
    console.log("showing dog info");
    setClickedIndex((state) => ({
      ...state,
      [index]: !state[index],
    }));
  };

  return (
    <>
      {loading ? (
        <Box>Loading dogz...</Box>
      ) : (
        <SimpleGrid
          minChildWidth={{ base: "200px", md: "md", lg: "lg" }}
          spacing="20px"
          m="8"
        >
          {dogs.map((dog, index) => (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              key={dog.id}
            >
              <Image
                src={dog.url}
                alt=""
                objectFit="stretch"
                onClick={handleClick(index)}
                cursor="pointer"
              />
              {clickedIndex[index] && (
                <Box>
                  {dog.breeds[0] ? dog.breeds[0].name : "No breed info"}
                </Box>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
export default Dogs;
