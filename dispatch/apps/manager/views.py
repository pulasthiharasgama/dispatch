from dispatch.apps.content.models import Article, Tag, Topic
from django.template import RequestContext
from django.shortcuts import render_to_response, render
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from .forms import ArticleForm

@staff_member_required
def articles(request):
    return render_to_response(
        "admin/articles/list.html",
        {'article_list' : Article.objects.all()},
        RequestContext(request, {}),
    )


@login_required
def article_edit(request, id):
    a = Article.objects.get(pk=id)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=a)
        if form.is_valid():
            return HttpResponseRedirect('/thanks/')


        tags = request.POST.get("tags")
        a.add_tags(tags)

        images = request.POST.get("images", False)
        if(images):
            a.add_images(images)

    else:
        form = ArticleForm(instance=a)

    tags = ",".join(a.tags.values_list('name', flat=True))

    # Images
    images = a.images.all()
    image_ids = ",".join([str(i) for i in a.images.values_list('id', flat=True)])

    context = {
        'form': form,
        'tags': tags,
        'images': images,
        'image_ids': image_ids,
    }

    return render(request, 'admin/article/edit.html', context)
