const artist = require("../models/artist");

const router = require("express").Router();

router.post("/save", async (req, res) => {
  const newArtist = artist({
    name: req.body.name,
    imageURL: req.body.imageURL,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });
  try {
    const savedArtist = await newArtist.save();
    return res.status(200).send({ artist: savedArtist });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await artist.find(filter);

  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

router.get("/getAll", async (req, res) => {
  const data = await artist.find();
  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "No Data Found" });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );
    return res.status(200).send({ artist: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await artist.deleteOne(filter);
  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Deleted", data: result });
  } else {
    return res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

module.exports = router;
