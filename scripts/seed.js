const { Exhibit, Image, User } = require("../models");

const main = async () => {
  // Delete everything in the database.
  await Exhibit.destroy({
    where: {}
  });
  await Image.destroy({
    where: {}
  });
  await User.destroy({
    where: {}
  });

  //Add seed for exhibit
  const exhibits = [
    {
      name: "Expressionism",

      artist: "Vincent van Gogh",
      description:
        "This week we look at major Van Gogh exhibitions which are being organised for next year. With such an enormous appetite for the artist, they will undoubtedly pull in the crowds. But the challenge for exhibition curators is to secure the loans. Just over 200 of the artist’s surviving paintings from his family ended up at Amsterdam’s Van Gogh Museum—which is constantly deluged with loan requests. Nearly a hundred are at the Kröller-Müller Museum in Otterlo, set in a national park in the east of the Netherlands. Van Gogh’s remaining 550 or so paintings are scattered far and wide, in museums and private collections.Andrew Lyons studied Fine Art at university, specialising in painting large abstract canvases. Then, after moving to France in 2005 he developed a passion for ‘Bande Dessinée’ (Frenco-Belgian comics). These two interests, combined with a love of acoustic music, have shaped his illustration style and seen him develop a body of work which is beautifully contemporary yet classically influenced."
    },
    {
      name: "Regarding Warhol: Sixty Artists, Fifty Years",
      //image: 'https://i.pinimg.com/originals/f5/54/47/f55447c05984e45e1deed556c83cdd63.jpg',
      artist: "Andy Warhol",
      description:
        "Through approximately forty-five works by Warhol alongside one hundred works by some sixty other artists, Regarding Warhol: Sixty Artists, Fifty Years juxtaposes prime examples of Warhol’s paintings, sculpture, and films with those by other artists who in key ways reinterpret, respond, or react to his groundbreaking work. What emerges is a fascinating dialogue between works of art and artists across generations. Organized by the Metropolitan Museum of Art with major loans from the collection of The Andy Warhol Museum, Regarding Warhol will be installed throughout the museum and reveal Warhol's extraordinary impact on contemporary art production."
    },
    {
      name: "Jackson Pollock: A Collection Survey, 1934–1954",
      //image: 'https://i.pinimg.com/564x/fe/2f/5d/fe2f5db047c7e385a49b8f5bbb1d7b6d.jpg',
      artist: "Jackson Pollock",
      description:
        "This exhibition offers a concise but detailed survey of the work of Jackson Pollock (American, 1912–1956). It tracks his artistic evolution from the 1930s and early 1940s, when he made loosely figurative images based on mythical or primeval themes, to the late 1940s and early 1950s, when he pioneered the radical abstractions for which he is best known by pouring and dripping paint onto canvas or paper. The exhibition features approximately 50 works—paintings, drawings, and prints—from the Museum’s collection, which is unparalleled in the breadth, depth, and quality of its Pollock holdings. Among the paintings on view is One: Number 31, 1950 (1950), arguably Pollock’s greatest masterpiece, and one of his largest canvases. Exceedingly rare and little-known engravings, lithographs, screenprints, and drawings are also included, highlighting an underappreciated side of one of the most important and influential American artists of the 20th century. By bringing together works made using a range of materials and techniques—both traditional and unorthodox—the exhibition underscores the relentless experimentation and emphasis on process that was at the heart of Pollock’s creativity."
    },
    {
      name: "Edvard Munch: The Scream",

      artist: "Edvard Munch",
      description:
        "Edvard Munch’s iconic The Scream (1895), among the most celebrated and recognized images in art history, will be on view at The Museum of Modern Art for a period of six months. Of the four versions of The Scream made by Munch between 1893 and 1910, this pastel-on-board from 1895 is the only one remaining in private hands; the three other versions are in the collections of museums in Norway. The Scream is being lent by a private collector."
    },
    {
      name: "New to the Print Collection: Matisse to Bourgeois",
      artist: "Henri Matisse",
      description:
        "Throughout his decades-long career as a painter, sculptor, draftsman, and printmaker, Henri Matisse continuously searched, in his own words, “for the same things, which I have perhaps realized by different means.” 1. Celebrated as both an orchestrator of tonal harmonies and a draftsman capable of distilling a form to its essentials, he long sought a way to unite color and line in his work. The relationship between these two formal elements can be traced from early works like Dance (I)—in which the side of a dancer’s body, set against fields of rich blue and green, is described in a single, arcing contour—to his late cut-outs like The Swimming Pool, in which the artist discovered a way at the end of his life to “cut directly into vivid color.” 2. Matisse was born in 1869 to generations of weavers in Le Cateau-Cambrésis, a northern French town whose woolen mills constituted the main industry. He was raised in nearby Bohain, famous for its luxury fabrics. This early exposure to textiles would shape his visual language: examples from his own collection of carpets and cloths from Europe, Africa, and the Middle East would deeply inform his sense of color and pattern and appear in his compositions."
    },
    {
      name: "Human Mind",

      artist: "Pablo Picasso",
      description:
        "In 1962, Italian filmmaker Federico Fellini got up one morning and described a dreamed encounter with Pablo Picasso in his The Book Of Dreams. Started in 1960, on the suggestion of his psychoanalyst, the book featured written and drawn accounts of what the filmmaker dreamed about. He dreamed about Picasso three times – in 1962, he dreamed that he and his wife were in Picasso’s kitchen; in 1967, he dreamed of Picasso as an elder brother and artistic father; and finally, in 1980, Picasso spoke to him as if to a friend and teacher. The exposition will feature a selection of drawings, films, photographs and other documents belonging to the Italian director, along with paintings, sculptures and drawings by Pablo Picasso, highlighting the two 20th-century artists’ shared sensibilities and obsessions."
    }
  ];

  //Create Image exhibit 1
  const images = [
    {
      name: 1,
      image_base64:
        "https://i.pinimg.com/564x/d9/95/ea/d995ea73d0a742bd2f86981c8c38d0b2.jpg"
    },
    {
      name: 2,
      image_base64:
        "https://i.pinimg.com/564x/e6/cb/45/e6cb45c0a6d7a4354aa6d5099b362bbc.jpg"
    },
    {
      name: 3,
      image_base64:
        "https://i.pinimg.com/564x/08/d0/64/08d06495ba57aae73c0d17c4c2f31bb6.jpg"
    },
    {
      name: 4,
      image_base64:
        "https://i.pinimg.com/564x/56/8a/a1/568aa1cd893fcc0e803ddd2db62a6282.jpg"
    },
    {
      name: 5,
      image_base64:
        "https://i.pinimg.com/564x/d1/f5/79/d1f57965aed6c63814b1434c82248d99.jpg"
    },
    {
      name: 6,
      image_base64:
        "https://i.pinimg.com/564x/11/ef/ab/11efab86d98a1cd540a210d8ac8a681c.jpg"
    },
    //Create Image exhibit 2
    {
      name: 1,
      image_base64:
        "https://i.pinimg.com/564x/41/98/9c/41989c8bb7efa1b996e40daae2802bd5.jpg"
    },
    {
      name: 2,
      image_base64:
        "https://i.pinimg.com/564x/8d/3e/40/8d3e40ebf3bddf3efda7d5e16f31496b.jpg"
    },
    {
      name: 3,
      image_base64:
        "https://i.pinimg.com/564x/2b/e6/ec/2be6ecab6b67aa3c4eac8fb12a1dc2c1.jpg"
    },
    {
      name: 4,
      image_base64:
        "https://i.pinimg.com/564x/f3/58/34/f35834b0aacc0cafb54b60e0c4b99f13.jpg"
    },
    {
      name: 5,
      image_base64:
        "https://i.pinimg.com/564x/e0/22/1c/e0221c30f3cb2a976f94905669b12dba.jpg"
    },
    {
      name: 6,
      image_base64:
        "https://i.pinimg.com/564x/e4/bc/83/e4bc8341ac9952e06e3fd29719dedeae.jpg"
    },

    //Create Image exhibit 3
    {
      name: 1,
      image_base64:
        "https://i.pinimg.com/564x/91/38/40/9138409cac44e101ccb18c04eae6c988.jpg"
    },
    {
      name: 2,
      image_base64:
        "https://i.pinimg.com/564x/2a/cb/7b/2acb7b5cf448f5ec20dde6eb8e13878c.jpg"
    },
    {
      name: 3,
      image_base64:
        "https://i.pinimg.com/564x/27/90/ea/2790ea1e229ee1a8bfdc8d529c353a0a.jpg"
    },
    {
      name: 4,
      image_base64:
        "https://i.pinimg.com/564x/8e/33/0c/8e330c9d97c2f3035a8a8deee48a87f9.jpg"
    },
    {
      name: 5,
      image_base64:
        "https://i.pinimg.com/564x/eb/9d/0d/eb9d0db0033a54b473aaede9ff5bf8af.jpg"
    },
    {
      name: 6,
      image_base64:
        "https://i.pinimg.com/564x/6b/8a/43/6b8a43e8c1c5560fd05d17c69bee31bd.jpg"
    },
    //Create Image exhibit 4
    {
      name: 1,
      image_base64:
        "https://i.pinimg.com/564x/75/7f/fa/757ffa6a121e90cf38c3186841ccfb16.jpg"
    },
    {
      name: 2,
      image_base64:
        "https://dg19s6hp6ufoh.cloudfront.net/pictures/612286327/large/302927_10150336690653525_190805859_n.jpeg"
    },
    {
      name: 3,
      image_base64:
        "https://i.pinimg.com/564x/17/96/d4/1796d429e42ee08047212eb3f395f0e7.jpg"
    },
    {
      name: 4,
      image_base64:
        "https://i.pinimg.com/564x/9e/8c/62/9e8c6217d1e505f1ba7656ec2b7452d9.jpg"
    },
    {
      name: 5,
      image_base64:
        "https://i.pinimg.com/564x/cb/d3/c5/cbd3c52f981b0a8949d6107a0047afb1.jpg"
    },
    {
      name: 6,
      image_base64:
        "https://i.pinimg.com/564x/30/ed/16/30ed16fa197f9c526b0d3708871335e6.jpg"
    },
    //Create Image exhibit 5
    {
      name: 1,
      image_base64:
        "https://i.pinimg.com/564x/ec/47/a4/ec47a420539b723c80613a1124160fa2.jpg"
    },
    {
      name: 2,
      image_base64:
        "https://i.pinimg.com/564x/05/66/f1/0566f1fb2f8cc884dd041e29c3184b24.jpg"
    },
    {
      name: 3,
      image_base64:
        "https://i.pinimg.com/564x/c2/1c/8e/c21c8eb5d2a54cf0f96aedb1388e97ba.jpg"
    },
    {
      name: 4,
      image_base64:
        "https://i.pinimg.com/564x/48/da/2f/48da2fbe1d61ae3a663c899a0da7828d.jpg"
    },
    {
      name: 5,
      image_base64:
        "https://i.pinimg.com/564x/eb/2a/a4/eb2aa4ce8c67b9d4bab2ece9f859233f.jpg"
    },
    {
      name: 6,
      image_base64:
        "https://i.pinimg.com/564x/28/7f/39/287f39cbaada96539af080800fa2b8ca.jpg"
    },
    //Create Image exhibit 6
    {
      name: 1,
      image_base64:
        "https://i.pinimg.com/564x/ca/6d/40/ca6d405229141f333906dfb47142824b.jpg"
    },
    {
      name: 2,
      image_base64:
        "https://i.pinimg.com/564x/e0/ed/7b/e0ed7b7ebb87001ab86aa650b274e8fd.jpg"
    },
    {
      name: 3,
      image_base64:
        "https://i.pinimg.com/564x/f8/74/d2/f874d21aef6db51612997810afbed089.jpg"
    },
    {
      name: 4,
      image_base64:
        "https://i.pinimg.com/564x/72/2d/3d/722d3d9bc1a16cb39f639952c691d8c2.jpg"
    },
    {
      name: 5,
      image_base64:
        "https://i.pinimg.com/564x/f1/9b/ca/f19bca6fb06615bd3e1ec00c32e261d2.jpg"
    },
    {
      name: 6,
      image_base64:
        "https://i.pinimg.com/564x/4b/cb/34/4bcb34db0c7039e333b4691ed960d989.jpg"
    }
  ];
  const dummyArtist = await User.create({
    google_id: 0,
    google_name: "test"
  });
  // associations exhibit Lyons

  try {
    const exhibitsInstances = await Exhibit.bulkCreate(exhibits, {
      returning: true
    });
    const imagesInstances = await Image.bulkCreate(images, { returning: true });

    await exhibitsInstances[0].setImages(imagesInstances.slice(0, 6));
    await exhibitsInstances[1].setImages(imagesInstances.slice(6, 12));
    await exhibitsInstances[2].setImages(imagesInstances.slice(12, 18));
    await exhibitsInstances[3].setImages(imagesInstances.slice(18, 24));
    await exhibitsInstances[4].setImages(imagesInstances.slice(24, 30));
    await exhibitsInstances[5].setImages(imagesInstances.slice(30, 36));
    // await exhibits.setimages(imagesInstances);
  } catch (e) {
    console.log(e);
  } finally {
    process.exit();
  }
};
main();
