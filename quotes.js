const api_url ="https://zenquotes.io/api/quotes/";

    async function getapi(url)
    {
      const response = await fetch(url);
      let data = await response.json();
      console.log(`${data[0].q}\n by-${data[0].a}`);
    }

    getapi(api_url);