const urlInput = document.getElementById("url_input");
const submitButton = document.getElementById("submit original");
const resultArea = document.getElementById("new URL");
const statsInput = document.getElementById("stats input");
const showStatsButton = document.getElementById("submit to show stats");
const infoDiv = document.getElementById("info area");
// function createCopyButton() {
//   const copy = document.createElement("button");
//   copy.id = "copy-button";
//   copy.type = "button";
//   copy.innerText = "copy 📝";
//   copy.onclick = "copyHandler()";
//   return copy;
// }
// const copyButton = createCopyButton();
const server = "/";

const shortener = async () => {
  try {
    const urlToChange = urlInput.value;
    if (!urlToChange) return;
    const response = await axios.post(
      `${server}shorten`,
      JSON.stringify(urlToChange)
    );
    const { shortUrl_id } = response.data;
    urlInput.value = "";
    const newRL = document.createElement("a");
    newRL.href = `https://young-chamber-23618.herokuapp.com/original/${shortUrl_id}`;
    newRL.innerText = `https://young-chamber-23618.herokuapp.com/original/${shortUrl_id}`;
    newRL.target = "”_blank”";
    resultArea.innerHTML = newRL;
  } catch (error) {
    alert("oops, something went wrong...");
  }
};

submitButton.addEventListener("click", shortener);

const presentStats = async () => {
  try {
    const shortenedUrl = statsInput.value;
    if (!shortenedUrl) return;
    const dividedUrl = shortenedUrl.split("/");
    const uniqueHash = dividedUrl[dividedUrl.length - 1];
    const { data } = await axios.get(`${server}statistic/${uniqueHash}`);
    infoDiv.innerText = `your shortened URL was created at ${
      data.creationDate
    } \n from ${data.URL}, \n and it was entered ${data.counter} ${
      data.counter === 1 ? "time" : "times"
    }.`;
    infoDiv.classList.add("alert", "alert-success");
    setTimeout(() => {
      infoDiv.classList.remove("alert", "alert-success");
      infoDiv.innerText = "";
    }, 10000);
  } catch (error) {
    infoDiv.innerText = `sorry, ${error.response.data}`;
    infoDiv.classList.add("alert", "alert-danger");
    setTimeout(() => {
      infoDiv.classList.remove("alert", "alert-danger");
      infoDiv.innerText = "";
    }, 50000);
  }
};
showStatsButton.addEventListener("click", presentStats);

// const copyHandler = () => {
//   resultArea.select();
//   navigator.clipboard.writeText(infoDiv.value);
// };
