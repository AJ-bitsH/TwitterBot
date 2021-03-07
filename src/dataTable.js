import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import axios from "./axios";

const columns = [
  {
    name: "tweet_url",
    label: "Tweet URL",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "urls",
    label: "URLs",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const DataTable = (props) => {
  const [axiosResponse, setAxiosResponse] = React.useState("");
  const username = props.username;
  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("http://localhost:9000/testAPI", {
        username: username,
      });
      setAxiosResponse(request.data);
      console.log(request.data);
      return request;
    }
    fetchData();
  }, [username]);

  const data = [];
  console.log(axiosResponse);

  axiosResponse &&
    axiosResponse.map((object, index) => {
      data.push({ tweet_url: object.text, urls: "object.urls[0]" });

      return [];
    });

  const options = {
    filterType: "checkbox",
    print: false,
    viewColumns: false,
  };

  return (
    <MUIDataTable
      title={"Tweet List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default DataTable;
