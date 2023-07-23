


export const colorHashTags = (text: string) => {
    const regex = /#[^\s]+/g;
    const tags = text.match(regex) || [];
    const newTags = tags.map((tag) => tag.trim());
  
    newTags.forEach((tag) => {
      if (text && text.includes(tag)) {
        const tagHTML = `<span style='color: blue;'>${tag}</span>`;
        text = text.replace(new RegExp(tag, 'g'), tagHTML)
      }
    }) 
      return {text, newTags}
  }
  
