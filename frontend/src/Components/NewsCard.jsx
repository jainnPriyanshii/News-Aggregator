import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function truncateDescription(description, maxWords = 50) {
  const words = description.split(".");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return description;
}

export default function RecipeReviewCard({ article }) {
  const [expanded, setExpanded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = async () => {
    console.log("Article Description:", article?.description); 
    try {
        const response = await axios.post(
            'http://localhost:3000/backend/favourite/', 
            { article: article.description },
            { headers: { 'Content-Type': 'application/json' } }  
        );

        if (response.status === 200) {
            setIsFavorite(!isFavorite);
        }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
};
const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: article?.title || 'Check out this article',
      text: article?.description || 'No description available',
      url: article?.link || window.location.href,
    })
    .then(() => console.log('Article shared successfully'))
    .catch((error) => console.error('Error sharing article:', error));
  } else {
    console.error('Web Share API is not supported in this browser');
  }
};

  return (
    <Card sx={{ maxWidth: 345, margin: '10px',height:'100%' }}>
      <CardMedia
        component="img"
        sx = {{height:"200",objectFit:"cover"}}
        image={article?.image_url}
        alt={"image display karana "}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {truncateDescription(article?.description || 'No description available', 10)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            <a
              href={article?.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              Read more
            </a>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}